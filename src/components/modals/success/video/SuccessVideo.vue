<script setup lang="ts">

import SuccessVideoModal, {Form} from "@/components/ui/modals/success-video/SuccessVideoModal.vue";
import {TailService} from "@/API/TailService.ts";
import {useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";
import {useDollStore} from "@/store/dolls.store.ts";
import {RecorderService} from "@/API/RecorderService.ts";
import {useRouter} from "vue-router";

const applicationStore = useApplicationStore()
const dollStore = useDollStore()
const router = useRouter()
const modalSettings = computed(() => applicationStore.getSettings('success-video'))


const onSendEmail = async (form: Form) => {
  console.log('send start')
  applicationStore.toggleLoading()
  const targetTail = dollStore.getTargetTail()
  if (targetTail && modalSettings.value?.videoName) {
    const videoFile = await RecorderService.getRecord(modalSettings.value.videoName)
    const response = await TailService.sendEmailTail({
      email: form.email.value,
      videoFile: videoFile as Blob,
      puppet_id: targetTail.id
    })
    if (!response) return applicationStore.toggleLoading()
    if (response.message === 'success') {
      applicationStore.toggleModal('success-video')
      applicationStore.toggleLoading()
      applicationStore.toggleModal('success-send')
    }
  } else {
    console.log(modalSettings.value?.videoName, targetTail)
    applicationStore.toggleLoading()
  }
}

const onClose = () => {
  applicationStore.toggleModal('success-video')
}

const onToMain = () => {
  applicationStore.toggleModal('success-video')
  const targetTail = dollStore.getTargetTail()
  if (targetTail) {
    targetTail.setTargetPerson(null)
    targetTail.setTargetBackground(null)
    targetTail.switchFocus()
  }
  dollStore.setTargetTail(null)
  const homePath = window.HOME
  if (homePath) window.location.href = homePath
  else router.push('/')
}
</script>

<template>
  <SuccessVideoModal
      :video-src="modalSettings?.targetVideo || ''"
      @on-send-email="onSendEmail"
      @on-to-main="onToMain"
      @on-close="onClose"
  />
</template>

<style scoped>

</style>