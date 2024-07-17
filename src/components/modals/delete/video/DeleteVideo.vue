<script setup lang="ts">

import DeleteVideModal from "@/components/ui/modals/delete-video/DeleteVideModal.vue";
import {useApplicationStore} from "@/store/application.store.ts";

const applicationStore = useApplicationStore()

const onClose = () => applicationStore.toggleModal('delete-video')
const onDelete = () => console.log('delete')
</script>

<template>
  <DeleteVideModal @onClose="onClose" @onDelete="onDelete" @onCancel="onClose"/>
</template>

<style scoped>

</style>