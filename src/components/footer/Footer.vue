<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useApplicationStore} from "@/store/application.store.ts";
import RecordButton from "@/components/ui/button/record-button/RecordButton.vue";
import ToMainButton from "@/components/ui/button/to-main-button/ToMainButton.vue";
import NextButton from "@/components/ui/button/next-button/NextButton.vue";

type FEmits = {
  (eventName: 'onNext'): void
  (eventName: 'onToMain'): void
  (eventName: 'onRecord'): void
  (eventName: 'onStop'): void
}

const router = useRouter()
const applicationStore = useApplicationStore()
const emits = defineEmits<FEmits>()
const namePage = ref(router.currentRoute.value.name)
const recordState = computed(() => applicationStore.getStateRecord())
const onNext = () => emits('onNext')
const onToMain = () => emits('onToMain')
const onRecord = () => emits('onRecord')
const onStop = () => emits('onStop')

</script>

<template>
  <footer class="footer">
    <ToMainButton @click="onToMain"/>
    <RecordButton
        v-if="namePage === 'record_tail'"
        :state="recordState"
        @on-record="onRecord"
        @on-stop="onStop"
    />
    <NextButton @click="onNext"/>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 150px;
}
</style>