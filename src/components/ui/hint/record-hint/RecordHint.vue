<script setup lang="ts">

import Hint from "@/components/ui/hint/Hint.vue";
import ArrowRight from "@/components/ui/svg/ArrowRight.vue";

type HProps = {
  x?: number,
  y?: number
}
const props = defineProps<HProps>()
const x = props.x + 'px'
const y = props.y + 'px'
</script>

<template>
  <div class="hint-card">
    <Hint class="hint-record">
      <template #content>
        <p>
          Когда будете готовы, нажмите кнопку 'Записать видео' для записи вашей сказки
        </p>
      </template>
    </Hint>
    <ArrowRight class="arrow"/>
  </div>

</template>

<style scoped>

.hint-card {
  position: absolute;
  left: v-bind(x);
  top: v-bind(y);
  width: 100%;
  height: 100%;
  max-width: 920px;
  max-height: 168px;
}

.hint-record {
  max-width: 620px;
  max-height: 168px;
}

.arrow {
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(10deg);
}

p {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
</style>