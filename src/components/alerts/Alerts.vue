<script setup lang="ts">
import {useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";

const applicationStore = useApplicationStore()

const alerts = computed(() => applicationStore.getAlerts())
</script>

<template>
  <section class="alerts">
    <template v-for="alert in alerts" :key="alert.name">
      <Transition name="fade">
        <component v-if="alert.settings.show" :is="alert.component" v-bind="alert.settings"/>
      </Transition>
    </template>
  </section>
</template>

<style scoped>

</style>