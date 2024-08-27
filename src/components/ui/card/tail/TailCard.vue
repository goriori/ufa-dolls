<script setup lang="ts">

import Card from "@/components/ui/card/Card.vue";

type CProps = {
  image: string
  title: string
  focused?: boolean
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
  <Card :class="['card-tail', {focused}]" @click="onClick">
    <template #card-center>
      <img
          :src="server_url+image || 'https://furman.top/uploads/posts/2022-06/1654264327_11-furman-top-p-novogodnii-kotik-art-krasivo-oboi-11.jpg'"
          loading="lazy"
          alt="preview">
    </template>
    <template #card-bottom>
      <h2>{{ title || 'Котик' }}</h2>
    </template>
  </Card>
</template>

<style scoped>
.card-tail {
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 20px 20px 40px 20px;
  border-radius: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  border: 20px solid transparent;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
}

.focused {
  border-color: rgba(35, 208, 62, 1);
}

img {
  width: 100%;
  height: 100%;
  max-height: 464px;
  min-height: 464px;
  border-radius: 60px;
}

h2 {
  font-size: 46px;
  font-weight: 700;
  text-align: center;
  color: rgba(39, 18, 109, 1);
}
</style>