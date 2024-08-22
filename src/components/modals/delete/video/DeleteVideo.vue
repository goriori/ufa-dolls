<script setup lang="ts">

import DeleteVideModal from "@/components/ui/modals/delete-video/DeleteVideModal.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {RecorderService} from "@/API/RecorderService.ts";
import {useRouter} from "vue-router";

const router = useRouter()
const applicationStore = useApplicationStore()

const onClose = () => applicationStore.toggleModal('delete-video')
const onDelete = async () => {
  const settings = applicationStore.getSettings('delete-video')
  if (settings && settings.videoName) {
    const result = await RecorderService.deleteRecord(settings.videoName)
    if (result) {
      onClose()
      await router.push('/')
    } else {
      onClose()
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