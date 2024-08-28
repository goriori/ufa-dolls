<script setup lang="ts">
import {AlertMessageTypes, useApplicationStore} from "@/store/application.store.ts";
import {computed} from "vue";

const applicationStore = useApplicationStore()

const alerts = computed(() => applicationStore.getAlerts())
</script>

<template>
  <section class="alerts">
    <template v-for="alert in alerts" :key="alert.name">
      <Transition name="fade">
        <component v-if="alert.settings.show" :is="alert.component" :message="alert.settings.message"
                   :type="alert.settings.type as AlertMessageTypes"/>
      </Transition>
    </template>
  </section>
</template>

<style scoped>

</style>