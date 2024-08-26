<script setup lang="ts">
import Cross from "@/components/ui/svg/Cross.vue";
import {computed, ref} from "vue";
import Button from "@/components/ui/button/Button.vue";

type MProps = {
  manuals: string[]
}
type MEmits = {
  (eventName: 'onClose'): void
  (eventName: 'onNext'): void
  (eventName: 'onFinish'): void
}
const emits = defineEmits<MEmits>()
const props = defineProps<MProps>()
const videoRef = ref<HTMLVideoElement | null>(null)
const targetIndex = ref(0)
const targetManual = computed(() => props.manuals[targetIndex.value])

const onClose = () => emits('onClose')

const onNext = () => {
  const manualCount = props.manuals.length - 1
  if (targetIndex.value === manualCount) {
    emits('onFinish')
  } else if (targetIndex.value <= manualCount) {
    targetIndex.value += 1
    emits('onNext')
  } else {
    targetIndex.value = 0
    emits('onFinish')
  }
}


</script>

<template>
  <article class="manual">
    <section class="manual-top">
      <Cross class="cross" @click="onClose"/>
    </section>
    <video ref="videoRef" :src="targetManual" muted autoplay @ended="onNext"></video>
    <section class="manual-footer">
      <Button class="btn-next" color="primary" title="Пропустить" @click="onNext"/>
    </section>
  </article>
</template>

<style scoped lang="scss">
@import '@/assets/scss/animation';

.manual {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
  flex-direction: column;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: 0.3s loadVideo linear;
  }

  &-top {
    width: 100%;
    position: absolute;
    z-index: 5;
    top: 40px;
    right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &-footer {
    width: 100%;
    height: 100%;
    max-height: 150px;
    position: absolute;
    z-index: 5;
    bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.btn {
  &-next {
    max-width: 500px;
  }
}


</style>