<script setup lang="ts">

import TailManual from "@/components/ui/manual/tail/TailManual.vue";
import {useApplicationStore} from "@/store/application.store.ts";

const applicationStore = useApplicationStore()
const finish = () => {
  applicationStore.toggleManual('tail')
}
</script>

<template>
  <TailManual @on-finish="finish" @on-close="finish"/>
</template>

<style scoped>

</style>