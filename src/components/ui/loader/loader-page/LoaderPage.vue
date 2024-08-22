<script setup lang="ts">

import DefaultLoader from "@/components/ui/loader/DefaultLoader.vue";
</script>

<template>
  <div class="loader-page">
    <DefaultLoader/>
  </div>
</template>

<style scoped>
.loader-page {
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.57);
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>