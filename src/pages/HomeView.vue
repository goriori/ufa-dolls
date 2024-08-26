<script setup lang="ts">

import {useRouter} from "vue-router";
import {computed, ComputedRef, onMounted, ref} from "vue";
import {useDollStore} from "@/store/dolls.store.ts";
import {TailService} from "@/API/TailService.ts";
import {Tail, Background, TBackground} from "@/entities/fairy-tale";
import Footer from "@/components/footer/Footer.vue";
import TailCard from "@/components/ui/card/tail/TailCard.vue";
import BackgroundCard from "@/components/ui/card/background/BackgroundCard.vue";
import TailHint from "@/components/ui/hint/tail-hint/TailHint.vue";
import BackgroundHint from "@/components/ui/hint/bakcground-hint/BackgroundHint.vue";
import DefaultLoader from "@/components/ui/loader/DefaultLoader.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {useInactivity} from "@/utils/useInactivity.ts";

enum STEP_APPLICATION {
  SET_TAIL,
  SET_BACKGROUND
}

const router = useRouter()
const dollsStore = useDollStore()
const applicationStore = useApplicationStore()
const {inactivityTime} = useInactivity()
const loading = ref(true)
const step = ref<STEP_APPLICATION>(STEP_APPLICATION.SET_TAIL)
const tails = computed<Tail[]>(() => dollsStore.getTails())
const backgrounds = computed<TBackground[]>(() => dollsStore.getTargetTailBackgrounds() || [])
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


const toMain = () => {
  applicationStore.toggleModal('confirm-exit')
}

const onNext = () => {
  if (!targetTail.value) return flashingCard(tails)
  step.value = STEP_APPLICATION.SET_BACKGROUND
  if (!targetBackground.value) return flashingCard(backgrounds)
  else return router.push('/record/tail')
}

const flashingCard = (cards: ComputedRef<TBackground[]> | ComputedRef<Tail[]>) => {
  cards.value.forEach(card => card.switchFocus())
  setTimeout(() => cards.value.forEach(card => card.switchFocus()), 300)
}


const initTails = async () => {
  if (dollsStore.getTails().length === 0) {
    const tails = await TailService.getTails()
    tails.forEach(tail => {
      dollsStore.addTail(
          new Tail(
              tail.id,
              tail.title,
              tail.image,
              tail.background,
              tail.players
          ))
    })
  }
  setTimeout(() => loading.value = false, 2000)
}

onMounted(async () => {
  inactivityTime()
  await initTails()
})

</script>
<template>
  <div class="page">
    <DefaultLoader v-if="loading" class="loader"/>
    <Teleport to="body">
      <Transition name="fade">
        <TailHint v-if="!targetTail && !loading" :class="{hidden:targetTail}" :x="400" :y="1000"/>
      </Transition>
      <Transition name="fade">
        <BackgroundHint
            v-if="targetTail && step === STEP_APPLICATION.SET_BACKGROUND && !targetBackground && !loading"
            :class="{hidden:targetBackground}"
            :x="50"
            :y="1500"
        />
      </Transition>
    </Teleport>
    <section class="choice tail" v-if="step === STEP_APPLICATION.SET_TAIL && !loading">
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
    <section class="choice background" v-if="step === STEP_APPLICATION.SET_BACKGROUND && !loading">
      <h1>Выберите фон</h1>
      <div class="backgrounds">
        <BackgroundCard v-for="background in targetTail?.tail_backgrounds"
                        :preview="background.image"
                        :focused="background.focused"
                        @on-click="onClickBackground(background)"
        />
      </div>
    </section>
    <Footer v-if="!loading" class="page-footer" @on-next="onNext" @on-to-main="toMain"/>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/mixins.scss";

.keyboard {
  left: 50%;
  transform: translate(-50%, 0);
}

.loader {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

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
  width: 100%;
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
