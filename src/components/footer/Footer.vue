<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useApplicationStore} from "@/store/application.store.ts";
import RecordButton from "@/components/ui/button/record-button/RecordButton.vue";
import ToMainButton from "@/components/ui/button/to-main-button/ToMainButton.vue";
import NextButton from "@/components/ui/button/next-button/NextButton.vue";

type FProps = {
  stateRecord?: boolean
}

type FEmits = {
  (eventName: 'onNext'): void
  (eventName: 'onToMain'): void
  (eventName: 'onRecord'): void
  (eventName: 'onStop'): void
}

const router = useRouter()
const applicationStore = useApplicationStore()
const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()
const namePage = ref(router.currentRoute.value.name)
const recordState = computed(() => applicationStore.getStateRecord())
const onNext = () => emits('onNext')
const onToMain = () => {
  if (props.stateRecord) return
  emits('onToMain')
}
const onRecord = () => emits('onRecord')
const onStop = () => emits('onStop')

</script>

<template>
  <footer class="footer">
    <section>
      <ToMainButton @click="onToMain" class="btn-main"/>
    </section>
    <section>
      <RecordButton
          v-if="namePage === 'record_tail'"
          :state="recordState"
          @on-record="onRecord"
          @on-stop="onStop"
          class="btn-record"
      />
    </section>
    <section>
      <NextButton v-show="namePage !== 'record_tail'" @click="onNext" class="btn-next"/>
    </section>

  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 150px;
}

section {
  height: 100%;
}

.btn {
  &-main {
    max-width: 652px;
  }

  &-record {
    margin-right: 600px;
    max-width: 730px;
  }

  &-next {
    max-width: 400px;
  }
}
</style>