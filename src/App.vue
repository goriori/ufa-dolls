<script setup lang="ts">
import { useRoute } from 'vue-router'
import Modals from "@/components/modals/Modals.vue";

const route = useRoute()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade">
        <Modals />
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
