<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useDollStore} from "@/store/dolls.store.ts";
import {TailService} from "@/API/TailService.ts";
import {Tail} from "@/entities/fairy-tale";
import {Background} from "@/entities/background";
import Footer from "@/components/footer/Footer.vue";
import TailCard from "@/components/ui/card/tail/TailCard.vue";
import BackgroundCard from "@/components/ui/card/background/BackgroundCard.vue";
import TailHint from "@/components/ui/hint/tail-hint/TailHint.vue";

enum STEP_APPLICATION {
  SET_TAIL,
  SET_BACKGROUND
}

const router = useRouter()
const dollsStore = useDollStore()
const step = ref<STEP_APPLICATION>(STEP_APPLICATION.SET_TAIL)
const tails = computed(() => dollsStore.getTails())
const targetTail = computed(() => dollsStore.getTargetTail())
const targetBackground = computed(() => targetTail.value?.target_background)


const onClickTail = (tail: Tail) => {
  if (targetTail.value) {
    targetTail.value?.switchFocus()
    tail.switchFocus()
    dollsStore.setTargetTail(tail)
  } else {
    tail.switchFocus()
    dollsStore.setTargetTail(tail)
  }
}


const onClickBackground = (background: Background) => {
  if (targetBackground.value) {
    targetBackground.value?.switchFocus()
    background.switchFocus()
    targetTail.value?.setTargetBackground(background)
  } else {
    background.switchFocus()
    targetTail.value?.setTargetBackground(background)
  }
}


const resetSteps = () => step.value = STEP_APPLICATION.SET_TAIL


const onNext = () => {
  if (targetBackground.value) return router.push('/record/tail')
  if (!targetTail.value) return flashingCard()
  step.value = STEP_APPLICATION.SET_BACKGROUND
}

const flashingCard = () => {
  tails.value.forEach(tail => tail.switchFocus())
  setTimeout(() => tails.value.forEach(tail => tail.switchFocus()), 300)
}


const initTails = async () => {
  if (dollsStore.getTails().length === 0) {
    const tails = await TailService.getTails()
    tails.forEach(tail => dollsStore.addTail(new Tail(tail.id, tail.title, tail.image, tail.background, tail.players)))
  }
}

onMounted(async () => {
  await initTails()
})

</script>
<template>
  <div class="page">
    <Teleport to="body">
      <Transition name="fade">
        <TailHint v-if="!targetTail" :class="{hidden:targetTail}" :x="400" :y="1000"/>
      </Transition>
    </Teleport>
    <section class="choice tail" v-if="step === STEP_APPLICATION.SET_TAIL">
      <h1>Выберите сказку</h1>
      <div class="tails">
        <TailCard
            v-for="tail in tails" :key="tail.id"
            :title="tail.tail_name"
            :image="tail.tail_preview"
            :focused="tail.focused"
            @on-click="onClickTail(tail)"
        />
      </div>
    </section>
    <section class="choice background" v-if="step === STEP_APPLICATION.SET_BACKGROUND">
      <h1>Выберите фон</h1>
      <div class="backgrounds">
        <BackgroundCard v-for="background in targetTail?.tail_backgrounds"
                        :preview="background.image"
                        :focused="background.focused"
                        @on-click="onClickBackground(background)"
        />
      </div>
    </section>
    <Footer class="page-footer" @on-next="onNext" @on-to-main="resetSteps"/>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/mixins.scss";

.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 130px;
  background-image: url("/images/bg.png"), linear-gradient(rgba(255, 127, 106, 1), rgba(255, 177, 105, 1), rgba(255, 235, 130, 1));
  background-repeat: no-repeat;
  background-size: cover;
}

h1 {
  font-size: 150px;
  font-weight: 700;
  color: #fff;
}

.choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  flex: 1;
}

.tails {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 1800px;
  max-height: 1600px;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex: 1 0 75%;
  @include no-scroll()
}

.backgrounds {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 2500px;
  max-height: 1600px;
  overflow-y: auto;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex: 1 0 80%;
  @include no-scroll()
}
</style>
