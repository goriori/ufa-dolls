<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useApplicationStore} from "@/store/application.store.ts";
import Modals from "@/components/modals/Modals.vue";
import LoaderPage from "@/components/ui/loader/loader-page/LoaderPage.vue";
import Manuals from "@/components/manuals/Manuals.vue";
import Alerts from "@/components/alerts/Alerts.vue";

const route = useRoute()
const applicationStore = useApplicationStore()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade">
        <LoaderPage v-if="applicationStore.getStateLoading()"/>
      </Transition>
      <Transition name="fade">
        <Alerts/>
      </Transition>
      <Transition name="fade">
        <Modals/>
      </Transition>
      <Transition name="fade">
        <Manuals v-if="route.name === 'home'"/>
      </Transition>
      <transition name="fade-page" mode="out-in">
        <suspense>
          <component :is="Component" :key="route.fullPath"></component>
        </suspense>
      </transition>
    </template>
  </RouterView>
</template>

<style scoped></style>
