<script setup lang="ts">
import {useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";

const applicationStore = useApplicationStore()

const manuals = computed(() => applicationStore.getManuals())
</script>

<template>
  <section class="modals">
    <template v-for="manual in manuals" :key="manual.name">
      <Transition name="fade">
        <component v-if="manual.settings.show" :is="manual.component"/>
      </Transition>
    </template>
  </section>
</template>

<style scoped>

</style>