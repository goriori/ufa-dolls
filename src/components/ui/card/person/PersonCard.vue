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
  <Card :class="['card-person', {focused}]" @click="onClick">
    <template #card-center>
      <div class="image-bg">
        <img class="item"
             data-x="0" data-y="0"
             :src="server_url+image || 'https://furman.top/uploads/posts/2022-06/1654264327_11-furman-top-p-novogodnii-kotik-art-krasivo-oboi-11.jpg'"
             alt="preview">
      </div>
    </template>
    <template #card-bottom>
      <h2>{{ title || 'Котик' }}</h2>
    </template>
  </Card>
</template>

<style scoped>
::v-deep(.card-top) {
  display: none;
}

.card-person {
  width: 100%;
  max-width: 500px;
  background-color: rgba(74, 22, 160, 1);
  padding: 0 0 30px 0;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: 0.3s all ease-in-out;
  cursor: pointer;
  border: 10px solid transparent;
}

.focused {
  border-color: rgba(35, 208, 62, 1);
}

.image-bg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 538px;
  min-height: 538px;
  border-radius: 30px;
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 538px;
  min-height: 538px;
  border-radius: 30px;
}

h2 {
  font-size: 46px;
  font-weight: 700;
  text-align: center;
  color: #fff;
}
</style>