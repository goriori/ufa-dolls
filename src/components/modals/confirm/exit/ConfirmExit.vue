<script setup lang="ts">

import ConfirmExitModal from "@/components/ui/modals/confirm-exit/ConfirmExitModal.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {useDollStore} from "@/store/dolls.store.ts";

const applicationStore = useApplicationStore()
const dollsStore = useDollStore()

const backHome = () => {
  window.location.href = window.HOME
}

const resetScore = () => {
  const targetTail = dollsStore.getTargetTail()
  if (targetTail) {
    targetTail.setTargetPerson(null)
    targetTail.setTargetBackground(null)
    targetTail.switchFocus()
  }
}

const exit = () => {
  resetScore()
  close()
  backHome()
}

const close = () => applicationStore.toggleModal('confirm-exit')
</script>

<template>
  <ConfirmExitModal @on-close="close" @on-cancel="close" @on-exit="exit"/>
</template>

<style scoped>

</style>