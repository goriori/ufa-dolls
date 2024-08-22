<script setup lang="ts">

import ComeBack from "@/components/ui/svg/ComeBack.vue";
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <Button :icon="ComeBack" color="secondary" title="На главную" class="btn-main" />
</template>

<style scoped>
.btn-main {
  gap: 55px;
  max-width: 650px;
}
</style>