<script setup lang="ts">
import {useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";

const applicationStore = useApplicationStore()

const modals = computed(() => applicationStore.getModals())
</script>

<template>
  <section class="modals">
    <template v-for="modal in modals" :key="modal.name">
      <Transition name="fade">
        <component v-if="modal.settings.show" :is="modal.component"/>
      </Transition>
    </template>
  </section>
</template>

<style scoped>

</style>