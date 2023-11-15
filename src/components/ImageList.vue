<script setup>
import { shareImageList, shareSelectedImageIndex } from "../ImageState";
let { images } = shareImageList();
let { selectedImageIndex } = shareSelectedImageIndex();
</script>

<!-- Select an image from the list, could also use a carousel etc. -->
<template>
  <v-col cols="12" md="12" justify="center">
    
    <v-card variant="tonal" color="primary" width="100%">
      <v-slide-group
        v-model="selectedImageIndex"
        selected-class="bg-success"
        show-arrows
        :mandatory="true"
      >
        <v-slide-group-item
          v-for="image in images"
          :key="image"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card
            :class="['ma-1', selectedClass]"
            max-height="100%"
            width="100%"
            @click="isSelected ? null : toggle()"
          >
            <v-img
              class="ma-2"
              :src="image"
              min-width="200px"
              max-width="400px"
            />
            <v-scale-transition v-if="isSelected" />
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-card>
  </v-col>
</template>
