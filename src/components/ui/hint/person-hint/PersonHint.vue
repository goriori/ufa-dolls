<script setup lang="ts">

import Hint from "@/components/ui/hint/Hint.vue";
import Palm from "@/components/ui/svg/Palm.vue";
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
  <div class="person-hint">
    <ArrowRight class="arrow"/>
    <Hint class="hint-element">
      <template #content>
        <Palm class="icon"/>
        <p>Выберите персонажей, чтобы начать создавать вашу сказку.</p>
      </template>
    </Hint>
  </div>
</template>

<style scoped>
.person-hint {
  position: absolute;
  left: v-bind(x);
  top: v-bind(y);
  width: 100%;
  height: 100%;
  max-width: 530px;
  max-height: 308px;

}

.hint-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 530px;
}

.icon {
  width: 120px;
  height: 120px;
}

.arrow {
  position: absolute;
  display: block;
  top: 380px;
  left: -120px;
  transform: rotate(150deg);
}

p {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
</style>