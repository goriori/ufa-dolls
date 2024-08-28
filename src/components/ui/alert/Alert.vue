<script setup lang="ts">

import {AlertMessageTypes} from "@/store/application.store.ts";

type AProps = {
  message: string
  type: AlertMessageTypes
}
defineProps<AProps>()
</script>

<template>
  <article :class="['alert', type]">
    {{ message }}
  </article>
</template>

<style scoped lang="scss">
.alert {
  position: absolute;
  z-index: 100;
  width: 100%;
  text-align: center;
  font-size: 40px;
  padding: 15px;

  &.error {
    background: #ea3c41;
  }

  &.warning {
    background: #d58512;
  }

  &.info {
    background: #5696ff;
  }
}

</style>