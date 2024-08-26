<script setup lang="ts">

import Manual from "@/components/ui/manual/Manual.vue";

type MEmits = {
  (eventName: 'onClose'): void
  (eventName: 'onFinish'): void
}
const emits = defineEmits<MEmits>()
const tailManuals = window.LIST_MANUALS

const onFinishManual = () => emits('onFinish')
const onCloseManual = () => emits('onClose')
</script>

<template>
  <Manual :manuals="tailManuals" @on-finish="onFinishManual" @on-close="onCloseManual"/>
</template>

<style scoped>

</style>