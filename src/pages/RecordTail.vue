<script setup lang="ts">
import {useRouter} from "vue-router";
import {computed, onMounted} from "vue";
import {useDollStore} from "@/store/dolls.store.ts";
import {Person} from "@/entities/person";
import interact from 'interactjs'
import PersonCard from "@/components/ui/card/person/PersonCard.vue";
import Footer from "@/components/footer/Footer.vue";
import RecordHint from "@/components/ui/hint/record-hint/RecordHint.vue";
import PersonHint from "@/components/ui/hint/person-hint/PersonHint.vue";
import Modals from "@/components/modals/Modals.vue";

const router = useRouter()
const dollStore = useDollStore()
const persons = computed(() => dollStore.getTargetTail()?.tail_persons)
const leftPersons = computed(() => persons.value?.slice(0, persons.value?.length / 2))
const rightPersons = computed(() => persons.value?.slice(persons.value?.length / 2, persons.value?.length))
const targetBackground = computed(() => serverUrl + dollStore.getTargetTailBackground()?.image)
const serverUrl = window.API

const onToMain = () => router.push('/')

const onTargetPerson = (person: Person) => {
  dollStore.getTargetTail()?.setTargetPerson(person)
}

const onRecord = () => {
  console.log('record')
}

onMounted(() => {
  interact('.item').draggable({
    listeners: {
      move(event) {
        const element = event.currentTarget
        const position = element.dataset
        position.x = Number(position.x) + event.dx
        position.y = Number(position.y) + event.dy
        event.target.style.transform =
            `translate(${position.x}px, ${position.y}px)`
      },
    }
  })
})
</script>

<template>
  <div class="page">
    <Teleport to="body">
      <Transition name="fade">
        <Modals v-if="false"/>
      </Transition>
      <Transition name="fade">
        <PersonHint v-if="!dollStore.getTargetTail()?.target_person" :x="800" :y="600" class="pulsar"/>
      </Transition>
      <Transition name="fade">
        <RecordHint :x="1000" :y="1700" class="pulsar"/>
      </Transition>
    </Teleport>
    <h1>Запись сказки</h1>
    <div class="recorder">
      <section class="left">
        <PersonCard v-for="item in leftPersons" :key="item.id"
                    :title="item.person_name"
                    :image="item.person_image"
                    @on-click="onTargetPerson(item)"
        />
      </section>
      <section class="center">
        <div class="background">
          <img
              :src="targetBackground"
              alt="">
        </div>
      </section>
      <section class="right">
        <PersonCard v-for="item in rightPersons" :key="item.id"
                    :title="item.person_name"
                    :image="item.person_image"
        />
      </section>
    </div>
    <Footer @on-to-main="onToMain" @on-record="onRecord"/>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  padding: 130px;
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

img {
  width: 100%;
  height: 100%;
  min-width: 2420px;
  max-height: 1336px;
  border: 10px solid #fff;
  border-radius: 80px;
}
</style>
