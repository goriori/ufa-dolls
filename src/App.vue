<script setup lang="ts">
import {useRoute} from 'vue-router'
import Modals from "@/components/modals/Modals.vue";
import LoaderPage from "@/components/ui/loader/loader-page/LoaderPage.vue";
import {useApplicationStore} from "@/store/application.store.ts";

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
        <Modals/>
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
