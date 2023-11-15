<script setup>
import { computed, ref } from "vue";
import { analyzeImageML } from "../AmazonML.js";
import { shareImageList, shareSelectedImageIndex, } from "../ImageState";
let { images } = shareImageList();
let { selectedImageIndex } = shareSelectedImageIndex();

let apiMessage = ref({
  show: false,
  type: "info",
  text: "",
});

const textractTableheaders = [
  { text: "Text", value: "text" },
  { text: "Confidence", value: "confidence" },
];

let tab = ref("labels");

let apiDetectLabelsRequestInProgress = ref(false);
let apiDetectTextRequestInProgress = ref(false);
const analyzeImage = async (type) => {
  let imageSrc = images.value[selectedImageIndex.value].src;
  let requestInProgress;
  let resultField;

  if (type === "labels") {
    requestInProgress = apiDetectLabelsRequestInProgress;
    resultField = "rekResult";
  } else if (type === "text") {
    requestInProgress = apiDetectTextRequestInProgress;
    resultField = "texResult";
  }

  requestInProgress.value = true;

  try {
    const returnData = await analyzeImageML(type, imageSrc);
    const results = JSON.parse(returnData);

    if (results.type === "success") {
      images.value[selectedImageIndex.value][resultField] = results.text;
    } else {
      apiMessage.value.type = results.type;
      apiMessage.value.text = results.text;
      apiMessage.value.show = true;
    }
  } catch (error) {
    apiMessage.value.type = "error";
    apiMessage.value.text = error;
    apiMessage.value.show = true;
  } finally {
    requestInProgress.value = false;
  }
};

const onDetectLabelsClick = async () => {
  await analyzeImage("labels");
};

const onDetectTextClick = async () => {
  await analyzeImage("text");
};
</script>

<template>
  <v-col cols="12">
    <v-card class="d-flex" variant="tonal" color="primary" width="auto">
      <v-img
        :src="images[selectedImageIndex]"
        class="shrink ma-2"
        min-height="400px"
        max-height="500px"
      />
      <v-col
        cols="2"
        class="d-flex flex-column justify-center"
        align-self="center"
      >
        <v-btn
          raised
          x-large
          variant="tonal"
          @click="onDetectLabelsClick"
          class="mb-2"
          style="font-size: 18px; text-transform: none"
          height="100px"
          :loading="apiDetectLabelsRequestInProgress"
          ><span>Detect<br />Labels<br /></span
        ></v-btn>
        <v-btn
          raised
          x-large
          variant="tonal"
          @click="onDetectTextClick"
          class="mt-2"
          style="font-size: 18px; text-transform: none"
          height="100px"
          :loading="apiDetectTextRequestInProgress"
          ><span>Detect<br />Text</span></v-btn
        >
        <v-dialog v-model="apiMessage.show">
          <v-alert dismissible :type="apiMessage.type" :text="apiMessage.text">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn
              style="text-transform: none"
              variant="tonal"
              color="white"
              text="Close"
              @click="apiMessage.show = false"
            ></v-btn>
          </v-alert>
        </v-dialog>
      </v-col>
      <v-col>
        <v-card variant="tonal" color="primary" max-height="600px">
          <v-tabs fixed-tabs v-model="tab" bg-color="primary" stacked>
            <v-tab value="labels">
              <v-icon>mdi-image-search-outline</v-icon> Labels</v-tab
            >
            <v-tab value="ocr"> <v-icon>mdi-ocr</v-icon> Text</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="labels">
              <v-table
                style="width: 100%; height: 400px; text-align: center"
                v-if="images[selectedImageIndex]"
              >
                <thead>
                  <tr>
                    <th style="text-align: center; font-size: 18px">
                      <strong>Object</strong>
                    </th>
                    <th style="text-align: center; font-size: 18px">
                      <strong>Confidence</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="objectDetected in images[selectedImageIndex]
                      ?.rekResult?.Labels"
                    :key="objectDetected.Name"
                  >
                    <td>
                      <span> {{ objectDetected.Name }} </span>
                    </td>
                    <td>
                      {{ parseFloat(objectDetected.Confidence).toFixed(1) }}%
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
            <v-window-item value="ocr">
              <v-table
                style="width: 100%; height: 400px; text-align: center"
                v-if="images[selectedImageIndex]"
              >
                <thead>
                  <tr>
                    <th style="text-align: start; font-size: 18px">
                      <strong>Text</strong>
                    </th>
                    <th style="text-align: center; font-size: 18px">
                      <strong>Confidence</strong>
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="text in images[selectedImageIndex].texResult.Blocks"
                >
                  <tr v-if="text.BlockType === 'LINE'">
                    <td style="text-align: left">
                      <span>{{ text.Text }}</span>
                    </td>
                    <td>{{ parseFloat(text.Confidence).toFixed(1) }}%</td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-card>
  </v-col>
</template>