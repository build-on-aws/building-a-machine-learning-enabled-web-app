<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
<v-app-bar :elevation="1" color="primary">
    <v-app-bar-title text="AcadeML" />
    <template v-slot:append>
      <v-btn icon="mdi-brightness-6" @click="toggleTheme"></v-btn>
    </template>
  </v-app-bar>
</template>