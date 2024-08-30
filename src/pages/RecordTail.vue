<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useDollStore} from "@/store/dolls.store.ts";
import {Person} from "@/entities/fairy-tale";
import {RecorderService} from "@/API/RecorderService.ts";
import interact from 'interactjs'
import PersonCard from "@/components/ui/card/person/PersonCard.vue";
import Footer from "@/components/footer/Footer.vue";
import RecordHint from "@/components/ui/hint/record-hint/RecordHint.vue";
import PersonHint from "@/components/ui/hint/person-hint/PersonHint.vue";
import DefaultLoader from "@/components/ui/loader/DefaultLoader.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {useInactivity} from "@/utils/useInactivity.ts";

const router = useRouter()
const dollStore = useDollStore()
const applicationStore = useApplicationStore()
const {inactivityTime} = useInactivity()
const timerInactivityId = ref<number | null>(null)
const persons = ref(dollStore.getTargetTail()?.tail_persons)
const loading = ref(true)

const leftPersons = computed(() => persons.value?.slice(0, persons.value?.length / 2))
const rightPersons = computed(() => persons.value?.slice(persons.value?.length / 2, persons.value?.length))
const targetBackground = computed(() => serverUrl + dollStore.getTargetTailBackground()?.image)
const targetPersons = computed(() => dollStore.getTargetTail()?.tail_persons.filter(person => person.target))
const serverUrl = window.API
const backgroundRef = ref<HTMLHtmlElement | null>(null)
const stateRecord = ref(false)
const recordTimer = ref<number | null>(null)

const onToMain = () => {
  applicationStore.toggleModal('confirm-exit')
}

const onTargetPerson = (person: Person) => {
  person.switchTarget()
  dollStore.getTargetTail()?.setTargetPerson(person)
}

const onUnsetTargetPersons = () => {
  dollStore.getTargetTail()?.tail_persons.forEach(person => person.unsetTarget())
}

const onChangePositionPerson = (x: number, y: number, transform: string, person_id: string | number) => {
  dollStore.getTargetTail()
      ?.tail_persons.find(person => person.id == person_id)
      ?.changePosition({
        x: Number(x),
        y: Number(y),
        transform: String(transform)
      })
}

const onRecord = () => {
  stateRecord.value = true
  applicationStore.toggleRecord()
  stopInactivityTimer()
  setTimeout(async () => {
    await RecorderService.playRecordScreen(getParamsAreaRecord())
    recordTimer.value = onStartTimerRecord()
  }, 500)
}

const onStartTimerRecord = () => {
  console.log('start timer')
  const TIME_RECORD = window.TIME_RECORD_SECONDS
  let currentTime = 0
  return setInterval(() => {
    if (currentTime === TIME_RECORD) {
      console.log('end timer')
      onStop()
    }
    currentTime += 1
  }, 1000)
}

const onStopTimerRecord = () => {
  if (recordTimer.value) clearInterval(recordTimer.value)
  recordTimer.value = null
}

const onStop = async () => {
  const {name} = await RecorderService.stopRecordScreen()
  applicationStore.toggleLoading()
  setTimeout(async () => {
    stateRecord.value = false
    applicationStore.toggleRecord()
    applicationStore.toggleLoading()
    onStopTimerRecord()
    await router.push(`/play/record/${name}`)
  }, 2000)
}


const getParamsAreaRecord = () => {
  const recordArea = document.getElementById('recordArea')
  if (recordArea && !window.IS_DEV) return {
    x: recordArea.offsetLeft,
    y: recordArea.offsetTop,
    width: recordArea.offsetWidth,
    height: recordArea.offsetHeight
  };
  return {
    x: 0,
    y: 0,
    width: 1920,
    height: 1080
  }
}

const initPositionPersons = async () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => backgroundRef.value ? resolve(true) : resolve(false), 2000)
  })
      .then(() => {
        dollStore.getTargetTail()?.tail_persons.forEach(person => {
          const width = backgroundRef.value?.offsetWidth
          const height = backgroundRef.value?.offsetHeight
          if (width && height) person.initPosition(width, height)
        })
      })
}

const stopInactivityTimer = () => {
  if (timerInactivityId.value) clearInterval(timerInactivityId.value)
}

const initInteract = async () => {
  interact('.item', {
    listeners: {
      start: (event) => {
        console.log('start initing', event)
      }
    }
  }).draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
      }),
      interact.modifiers.restrictEdges({
        outer: 'parent',
      }),
    ],
    listeners: {
      move(event) {
        const element = event.currentTarget
        let {x, y, person_id} = element.dataset
        x = Number(x) + event.dx
        y = Number(y) + event.dy
        event.target.style.transform = `translate(${x}px, ${y}px)`
        onChangePositionPerson(x, y, event.target.style.transform, person_id)
      },
    }
  })
}

onMounted(async () => {
  timerInactivityId.value = inactivityTime()
  await initInteract()
  setTimeout(() => {
    loading.value = false
    applicationStore.toggleLoading()
    initPositionPersons().then(applicationStore.toggleLoading)
  }, 2000)
})

onBeforeUnmount(() => {
  initPositionPersons()
  onUnsetTargetPersons()
})

onUnmounted(() => {
  stopInactivityTimer()
})
</script>

<template>
  <div class="page">
    <DefaultLoader v-if="loading" class="loader"/>
    <Teleport to="body">
      <Transition name="fade">
        <PersonHint v-if="!dollStore.getTargetTail()?.target_person && !loading && !stateRecord" :x="800" :y="600"
                    class="pulsar"/>
      </Transition>
      <Transition name="fade">
        <RecordHint v-if="!stateRecord && !loading" :x="900" :y="1700" class="pulsar"/>
      </Transition>
    </Teleport>
    <template v-if="!loading">
      <h1>Запись сказки</h1>
      <div class="recorder">
        <section class="left">
          <PersonCard v-for="item in leftPersons" :key="item.id"
                      :title="item.person_name"
                      :image="item.person_image"
                      :target="item.target"
                      @on-click="onTargetPerson(item)"
          />
        </section>
        <section class="center">
          <div class="background" id="recordArea">
            <template v-for="targetPerson in targetPersons" :key="targetPerson.id">
              <img
                  class='person item'
                  :data-person_id="targetPerson.id"
                  :data-x="targetPerson.position.x"
                  :data-y="targetPerson.position.y"
                  :src="serverUrl+targetPerson.person_image"
                  :style="{
                  width:targetPerson.width + 'px',
                  height:targetPerson.height + 'px',
                  transform:targetPerson.position.transform
                }"
                  alt="person">
            </template>

            <img
                ref="backgroundRef"
                class="background-image"
                :src="targetBackground"
                alt="">
          </div>
        </section>
        <section class="right">
          <PersonCard v-for="item in rightPersons" :key="item.id"
                      :title="item.person_name"
                      :image="item.person_image"
                      :target="item.target"
                      @on-click="onTargetPerson(item)"
          />
        </section>
      </div>
    </template>
    <Transition name="fade">
      <Footer v-if="!loading" :state-record="stateRecord" @on-to-main="onToMain" @on-record="onRecord"
              @on-stop="onStop"/>
    </Transition>
  </div>
</template>

<style scoped>


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
  justify-content: center;
  align-items: center;
  padding: 130px;
  gap: 120px;
  background: linear-gradient(rgba(255, 127, 106, 1), rgba(255, 177, 105, 1), rgba(255, 235, 130, 1));
}

h1 {
  font-size: 150px;
  font-weight: 700;
  color: #fff;
}

.recorder {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
}

.left, .right {
  display: flex;
  flex: 0 0 500px;
  flex-direction: column;
  gap: 40px;
}

.background {
  width: 100%;
  height: 100%;
  max-width: 2420px;
  max-height: 1336px;
}

.person {
  user-select: none;
  touch-action: none;
  position: absolute;
  z-index: 1;
  border-radius: 30px;
}

.background-image {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 2420px;
  max-height: 1336px;
  border: 10px solid #fff;
  border-radius: 80px;
}
</style>
