<script setup>
import { onBeforeMount } from "vue";
import { initImages } from "./ImageState";
import AppHeader from "./components/AppHeader.vue";
import Instructions from "./components/Instructions.vue";
import AddLocalImages from "./components/AddLocalImages.vue";
import ImageList from "./components/ImageList.vue";
import ImageAnalysis from "./components/ImageAnalysis.vue";
import AppFooter from "./components/AppFooter.vue";

onBeforeMount(async () => {
  await initImages();
});
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container>
        <v-row>
          <Instructions />
          <AddLocalImages />
        </v-row>
        <v-row>
          <ImageList />
        </v-row>
        <v-row>
          <ImageAnalysis />
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>