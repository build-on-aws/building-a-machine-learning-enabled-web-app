<template>
    <div class="image-analysis">
        <section class="acknowledge">
            <!-- This section contains the checkbox to acknowledge the warning about using appropriate photos. -->
            <input type="checkbox" id="warning" v-model="warningAccepted" />
            <label for="warning">I understand and accept the conditions listed above for image labelling and text
                extraction.</label>

            <br />

            <!-- This button only appears when the checkbox is ticked. -->
            <button class="button" v-if="warningAccepted" @click="openFilePicker">Choose a photo</button>
            <input type="file" ref="fileInput" id="input" v-if="warningAccepted" @change="onFileSelected" accept="image/*"
                style="display: none" />

            <!-- This button only appears when the user has selected a photo that is under 5MB. -->
            <button v-show="!noFileSelected" class="button" @click="analysePhotowithRekognition">Analyze with Amazon
                Rekognition</button>

        </section>

        <main id="container">
            <article id="content">
                <!-- This container only appears when a file is successfully loaded -->
                <figure v-show="!noFileSelected" id="photo-container">
                    <img id="userPhoto" :src="userPhoto" class="photoFrame" width="720" />
                </figure>
                <!-- This list only appears when the Amazon Rekognition API has been successfully called -->
                <section v-if="rekognitionSuccess" class="text-container instructions" id="rekognition">
                    <h2>Object Detection with <span class="text-gradient">Amazon Rekognition</span></h2>
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <th>Object</th>
                                <th>Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="objectDetected in objectsDetected.Labels" :key="objectDetected.Name">
                                <td><span class="text-gradient">{{ objectDetected.Name }}</span></td>
                                <td>({{ parseFloat(objectDetected.Confidence).toFixed(1) }}%)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </article>
        </main>
    </div>
</template>      

<script setup>
import { RekognitionClient, DetectLabelsCommand } from "@aws-sdk/client-rekognition";
</script>

<script>
export default {
    data() {
        return {
            warningAccepted: false,         // Has the user ticked the acknowledge checkbox?
            noFileSelected: true,           // Has the user selected a file (that is a jpg/png and under 5MB)
            uimage_bytes: null,             // The image bytes encoded in the way Amazon Rekognition wants them
            rekognitionClient: null,        // The Rekognition Client
            rekognitionSuccess: false,      // If the Rekognition Client returned labels from a DetectLabels call
            objectsDetected: null,          // What was detected? This is a list of objects, including labels and confidence 
            userPhoto: null,                // The image src for the user-selected photo
            confidence: 70,                 // Default confidence level to send in the Rekognition query parameters
            numLabels: 10,                  // Default number of labels to return in the Rekognition query parameters
        };
    },
    methods: {
        // Open the file selector dialogue
        openFilePicker(event) {
            this.$refs.fileInput.click()
        },
        // Called when a file is selected
        onFileSelected(event) {
            const imageFile = event.target.files[0];
            if (imageFile) {
                if (imageFile.size > 5242880) {
                    alert("Your file is too large, please select a file that 5MB or less.")
                    return
                }

                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    // display the image.
                    const imagesrc = e.target.result
                    // We also need to encode it for Rekognition
                    if (!this.processImage(imagesrc)) {
                        alert("There was an issue processing the photo, please try a different photo.")
                        return
                    }

                    // New image, so reset the rekognition flag
                    this.rekognitionSuccess = false;
                    this.noFileSelected = false;
                };
                fileReader.readAsDataURL(imageFile);
            }
        },
        // Check the file is an image we can use and unencode it for Rekognition
        processImage(imagesrc) {
            var image = null;
            var jpg = true;
            // First, check if the file is a jpeg or a png.
            try {
                image = atob(imagesrc.split("data:image/jpeg;base64,")[1]);
            } catch (e) {
                jpg = false;
            }
            if (jpg == false) {
                try {
                    image = atob(imagesrc.split("data:image/png;base64,")[1]);
                } catch (e) {
                    alert("Please select a .jpg or .png file.");
                    this.noFileSelected = true;
                    return false;
                }
            }
            //unencode image bytes for Rekognition API 
            var length = image.length;
            var imageBytes = new ArrayBuffer(length);
            this.uimage_bytes = new Uint8Array(imageBytes);
            for (var i = 0; i < length; i++) {
                this.uimage_bytes[i] = image.charCodeAt(i);
            }
            // Set the image
            this.userPhoto = imagesrc;
            return true;
        },
        // Analyze photo with Amazon Rekognition
        async analysePhotowithRekognition() {
            // Is the rekognition client initialized? (maybe this is the first time we've called it)
            if (!this.rekognitionClient) {
                // Create a new rekognition client. 
                // This will require a file in the root folder of the project called .env.local with specific values
                // These are unique to each IAM account and should never be embedded in code or uploaded to GitHub
                // Follow the instructions in Workshop Studio or the repo README for more details
                // https://vitejs.dev/guide/env-and-mode.html
                try {
                    const client = new RekognitionClient({
                        region: import.meta.env.VITE_AWS_REGION,
                        credentials: {
                            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
                            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
                            sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN,
                        },
                    });
                    console.log(client)
                    this.rekognitionClient = client
                } catch (e) {
                    console.log(e)
                }
            }

            const params = {
                Image: { Bytes: this.uimage_bytes },
                MaxLabels: this.numLabels,
                MinConfidence: this.confidence,
            };

            try {
                const query = new DetectLabelsCommand(params)
                const response = await this.rekognitionClient.send(query)
                this.objectsDetected = response;
                console.log(response);
                this.rekognitionSuccess = true;
            } catch (e) {
                console.log(e)
                alert("There was an error calling detect labels, please check the console for details.")
            }
        },
        // -------------------- 


    },
}
</script>
