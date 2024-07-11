<script setup lang="ts">

import Button from "@/components/ui/button/Button.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";

type FEmits = {
  (eventName: 'onNext'): void
  (eventName: 'onToMain'): void
  (eventName: 'onRecord'): void
}

const router = useRouter()
const emits = defineEmits<FEmits>()
const namePage = ref(router.currentRoute.value.name)
const onNext = () => emits('onNext')
const onToMain = () => emits('onToMain')
const onRecord = () => emits('onRecord')
</script>

<template>
  <footer class="footer">
    <Button color="secondary" title="На главную" class="btn-main" @click="onToMain"/>
    <Button
        v-if="namePage === 'record_tail'"
        color="thridy" title="Записать видео"
        class="btn-main" @click="onRecord"
    />
    <Button color="primary" title="Далее" class="btn-next" @click="onNext"/>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 150px;
}

.btn-main, .btn-play {
  max-width: 650px;
}

.btn-next {
  max-width: 400px;
}
</style>