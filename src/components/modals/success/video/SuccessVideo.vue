<script setup lang="ts">

import SuccessVideoModal from "@/components/ui/modals/success-video/SuccessVideoModal.vue";
import {TailService} from "@/API/TailService.ts";
import {useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";
import {useDollStore} from "@/store/dolls.store.ts";
import {RecorderService} from "@/API/RecorderService.ts";

const applicationStore = useApplicationStore()
const dollStore = useDollStore()
const modalSettings = computed(() => applicationStore.getSettings('success-video'))
const onSendEmail = async (form: { email: string }) => {
  const targetTail = dollStore.getTargetTail()
  if (targetTail && modalSettings.value?.videoName) {
    const videoFile = await RecorderService.getRecord(modalSettings.value.videoName)
    const response = await TailService.sendEmailTail({
      ...form,
      videoFile: videoFile,
      puppet_id: targetTail.id
    })
    if (response.message === 'success') {
      applicationStore.toggleModal('success-video')
      applicationStore.toggleModal('success-send')
    }
  }
}

const onToMain = () => {
  applicationStore.toggleModal('success-video')
}
</script>

<template>
  <SuccessVideoModal :video-src="modalSettings?.targetVideo || ''" @on-send-email="onSendEmail" @on-to-main="onToMain"/>
</template>

<style scoped>

</style>