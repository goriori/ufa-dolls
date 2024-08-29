<script setup lang="ts">

import Card from "@/components/ui/card/Card.vue";

type CProps = {
  focused?: boolean
  preview?: string
}
type CEmits = {
  (eventName: 'onClick'): void
}
defineProps<CProps>()
const emits = defineEmits<CEmits>()
const server_url = window.API
const onClick = () => emits('onClick')
</script>

<template>
  <Card :class="['card-background', {focused}]" @click="onClick">
    <template #card-center>
      <img
          :src="server_url+preview"
          loading="lazy"
          alt="preview">
    </template>
  </Card>
</template>

<style scoped>

.card-background {

  width: 100%;
  max-width: 1100px;
  border-radius: 80px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  border: 20px solid #fff;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
}

img {
  width: 100%;
  height: 680px;
  object-fit: cover;
  border-radius: 60px;
}

.focused {
  border-color: rgba(35, 208, 62, 1);
}
</style>