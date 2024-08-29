<script setup lang="ts">

import SuccessSendModal from "@/components/ui/modals/success-send/SuccessSendModal.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {useRouter} from "vue-router";
import {useDollStore} from "@/store/dolls.store.ts";

const router = useRouter()
const applicationStore = useApplicationStore()
const dollsStore = useDollStore()
const onClose = () => {
  applicationStore.toggleModal('success-send')
}

const onToMain = () => {
  const targetTail = dollsStore.getTargetTail()
  targetTail?.switchFocus()
  targetTail?.setTargetPerson(null)
  targetTail?.setTargetBackground(null)
  dollsStore.setTargetTail(null)
  onClose()
  const homePath = window.HOME
  if (homePath) window.location.href = window.HOME
  else router.push('/')
}
</script>

<template>
  <SuccessSendModal @on-to-main="onToMain" @onClose="onClose"/>
</template>

<style scoped>

</style>