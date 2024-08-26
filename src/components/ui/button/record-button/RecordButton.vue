<script setup lang="ts">

import Record from "@/components/ui/svg/Record.vue";
import StopRecord from "@/components/ui/svg/StopRecord.vue";
import Button from "@/components/ui/button/Button.vue";

type BProps = {
  state: boolean
}
type BEmits = {
  (eventName: 'onRecord'): void
  (eventName: 'onStop'): void
}

const props = defineProps<BProps>()
const emits = defineEmits<BEmits>()

const onClick = () => {
  if (!props.state) return emits('onRecord')
  else return emits('onStop')
}
</script>

<template>
  <Button
      :icon_right="!state ? Record: StopRecord"
      color="thridy" :title="!state ? 'Записать видео': 'Остановить видео'"
      :class="[!state? 'btn-play' : 'btn-stop', 'btn']"
      @click="onClick"
  />
</template>

<style scoped>
.btn {
  font-size: 40px;
}

.btn-play {
  gap: 55px;
  max-width: 650px;
}

.btn-stop {
  gap: 20px;
  max-width: 650px;
}
</style>