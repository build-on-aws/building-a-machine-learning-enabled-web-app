<script setup>
import { ref } from "vue";
import { shareImageList, shareSelectedImageIndex, loadImageBytes, } from "../ImageState";

let { images } = shareImageList();
let { selectedImageIndex } = shareSelectedImageIndex();

let file = ref(null);
let fileInput = ref(null);

// File size rules and uploading method
const rules = [
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 5000000 ||
      "Image size must be less than 5 MB!"
    );
  },
];

const uploadFile = async () => {
  if (file.value[0] instanceof File) {
    const fileUrl = URL.createObjectURL(file.value[0]);
    const src = await loadImageBytes(fileUrl).catch((err) => {
      console.error(err);
      return;
    });
    images.value.push({
      src: src,
      rekResult: {},
      texResult: {},
    });
    // Select this item once it is added to the list
    selectedImageIndex.value = images.value.length - 1;
    // Clear the upload file widget
    file.value = null;
    fileInput.value.reset();
    URL.revokeObjectURL(fileUrl);
  }
};
</script>

<template>
  <v-col cols="12" md="6">
    <v-card
      min-height="100%"
      title="(Optional) Add your own image to the list"
      variant="tonal"
      color="secondary"
      width="auto"
    >      
      <v-card-text class="py-1">
        Only PNG and JPG images may be uploaded. Each file must be 5MB or less.<br />
      </v-card-text>
      <v-card-actions>
        <v-file-input
          label="Choose image from your device"
          :rules="rules"
          v-model="file"
          ref="fileInput"
          single
          accept="image/png, image/jpeg"
          show-size
          counter
          prepend-icon="mdi-file-image"
        ></v-file-input>
        <v-btn
          class="ml-2"
          variant="outlined"
          :disabled="!file"
          @click="uploadFile"
          >Add to image list</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-col>
</template>