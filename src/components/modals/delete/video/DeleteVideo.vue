<script setup lang="ts">

import DeleteVideModal from "@/components/ui/modals/delete-video/DeleteVideModal.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {RecorderService} from "@/API/RecorderService.ts";
import {useRouter} from "vue-router";
import {useDollStore} from "@/store/dolls.store.ts";

const router = useRouter()
const applicationStore = useApplicationStore()
const dollStore = useDollStore()
const onClose = () => applicationStore.toggleModal('delete-video')
const clearTargetSettings = () => {
  const targetTail = dollStore.getTargetTail()
  targetTail?.switchFocus()
  targetTail?.target_background?.switchFocus()
  targetTail?.setTargetBackground(null)
  targetTail?.setTargetPerson(null)
  dollStore.setTargetTail(null)
}
const onDelete = async () => {
  const settings = applicationStore.getSettings('delete-video')
  if (settings && settings.videoName) {
    const result = await RecorderService.deleteRecord(settings.videoName)
    if (result) {
      onClose()
      clearTargetSettings()
      await router.push('/')
    } else {
      onClose()
      clearTargetSettings()
      await router.push('/')
    }
  }
  console.log('delete')
}
</script>

<template>
  <DeleteVideModal @onClose="onClose" @onDelete="onDelete" @onCancel="onClose"/>
</template>

<style scoped>

</style>