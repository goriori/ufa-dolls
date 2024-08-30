<script setup lang="ts">

import Record from "@/components/ui/svg/Record.vue";
import StopRecord from "@/components/ui/svg/StopRecord.vue";
import Button from "@/components/ui/button/Button.vue";
import {ref} from "vue";

type BProps = {
  state: boolean
}
type BEmits = {
  (eventName: 'onRecord'): void
  (eventName: 'onStop'): void
}

const props = defineProps<BProps>()
const emits = defineEmits<BEmits>()

const isDisable = ref(false)

const onClick = () => {
  if (!props.state) {
    emits('onRecord')
    isDisable.value = true
    setTimeout(() => isDisable.value = false, 4000)
  } else {
    emits('onStop')
    isDisable.value = true
    setTimeout(() => isDisable.value = false, 3000)
  }
}
</script>

<template>
  <Button
      :icon_right="!state ? Record: StopRecord"
      color="thridy" :title="!state ? 'Записать видео': 'Остановить видео'"
      :class="[!state? 'btn-play' : 'btn-stop', 'btn']"
      :disabled="isDisable"
      @click="onClick"
  />
</template>

<style scoped>


.btn-play {
  gap: 55px;
}

.btn-stop {
  gap: 20px;
  max-width: 650px;
}
</style>