<script setup>
import AnalyzePhoto from "./components/AnalyzePhoto.vue";
</script>

<template>
  <main>
    <h2><span class="text-gradient">AWS Machine Learning</span> Workshop</h2>
    <p class="instructions">
      This web app analyses photos using Amazon Rekognition and Amazon Textract APIs:<br/>
      Please ensure the photo is 5MB or less in size.<br/>
      Please do <strong>not</strong> choose a photo that contains any people, faces, or sensitive data.<br/>
      Please do <strong>not</strong> choose an offensive photo.<br/>
      <i>If you have no photos on this device, some photos are supplied in the <code>public</code> folder.</i><br/>     
    </p>      
    <AnalyzePhoto/>
  </main>
</template>