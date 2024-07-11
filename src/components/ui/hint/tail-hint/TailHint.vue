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
  <div class="hint-card pulsar">
    <Hint class="hint-record">
      <template #content>
        <p>
          Выберите одну из предложенных сказок и нажмите «Далее»
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
  top: -150px;
  left: 300px;
  transform: rotate(-30deg);
}

p {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
</style>