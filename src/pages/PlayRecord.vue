<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import BackStepVideo from "@/components/ui/svg/BackStepVideo.vue";
import Play from "@/components/ui/svg/Play.vue";
import NextStepVideo from "@/components/ui/svg/NextStepVideo.vue";
import SoundOff from "@/components/ui/svg/SoundOff.vue";
import SoundOn from "@/components/ui/svg/SoundOn.vue";
import Delete from "@/components/ui/svg/Delete.vue";
import Pause from "@/components/ui/svg/Pause.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";
import {RecorderService} from "@/API/RecorderService.ts";
import Footer from "@/components/footer/Footer.vue";
import {useApplicationStore} from "@/store/application.store.ts";
import {formatTime} from "@/utils/helpers/formatTime.ts";
import {useInactivity} from "@/utils/useInactivity.ts";

const applicationStore = useApplicationStore()
const router = useRouter()
const route = useRoute()
const {inactivityTime} = useInactivity()
const timerInactivityId = ref<number | null>(null)
const recordTail = ref<HTMLVideoElement | null>(null)
const durationTime = ref<string | undefined>('00:00')
const duration = ref<number | undefined>(0)
const progress = ref('0%')
const play = ref(false)
const sound = ref(false)

const onPlay = () => {
  recordTail.value?.play()
  play.value = true
}

const onPause = () => {
  recordTail.value?.pause()
  play.value = false
}

const onNextStep = () => {
  if (recordTail.value?.currentTime) {
    recordTail.value.currentTime += 10
  }
}
const onBackStep = () => {
  if (recordTail.value?.currentTime) {
    recordTail.value.currentTime -= 10
  }
}
const onMuted = () => {
  if (recordTail.value) {
    recordTail.value.muted = !recordTail.value.muted;
    sound.value = recordTail.value.muted
  }
}

const onToMain = () => {
  applicationStore.toggleModal('confirm-exit')
}

const onNext = () => {
  applicationStore.setSettingsModal('success-video', {
    targetVideo: recordTail.value?.src,
    videoName: route.params.videoName
  })
  applicationStore.toggleModal('success-video')
}
const onDelete = () => {
  applicationStore.setSettingsModal('delete-video', {videoName: route.params.videoName})
  applicationStore.toggleModal('delete-video')
}

const onUpdateProgressVideoPlay = () => {
  if (recordTail.value) {
    progress.value = (`${(recordTail.value.currentTime / recordTail.value.duration) * 100}%`)
  }
}
onMounted(async () => {
  timerInactivityId.value = inactivityTime()
  const videoName = route.params.videoName
  if (recordTail.value) {
    const videoLoaded = await RecorderService.getRecord(videoName as string);
    if (videoLoaded) {
      recordTail.value.src = `http://localhost:3000/api/video/${videoName}`
      recordTail.value.load()
      recordTail.value.onloadedmetadata = function () {
        duration.value = recordTail.value?.duration as number
        durationTime.value = formatTime(recordTail.value?.duration as number)
      };
    } else {
      await router.push('/')
    }
  }
})
onUnmounted(() => {
  if (timerInactivityId.value) clearInterval(timerInactivityId.value)
})
</script>

<template>
  <div class="page">
    <section class="center">
      <div class="background">
        <video
            ref="recordTail"
            alt=""
            @timeupdate="onUpdateProgressVideoPlay"
            @ended="play = !play"
        >

        </video>
        <div class="video-track">
          <div class="time" v-if="durationTime">{{ durationTime }}</div>
          <div class="track"></div>
        </div>
        <div class="video-actions">
          <div class="left"></div>
          <div class="center">
            <Button class="btn" color="primary" :icon="BackStepVideo" @click="onBackStep"/>
            <Button class="btn" v-if="!play" color="primary" :icon="Play" @click="onPlay"/>
            <Button class="btn" v-else color="primary" :icon="Pause" @click="onPause"/>
            <Button class="btn" color="primary" :icon="NextStepVideo" @click="onNextStep"/>
          </div>
          <div class="right">
            <Button class="btn" v-if="sound" color="primary" :icon="SoundOff" @click="onMuted"/>
            <Button class="btn" v-else color="primary" :icon="SoundOn" @click="onMuted"/>
            <Button class="btn" color="primary" :icon="Delete" @click="onDelete"/>
          </div>
        </div>
      </div>
    </section>
    <Footer @on-to-main="onToMain" @on-next="onNext"/>
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

.background {
  width: 100%;
  height: 100%;
  max-width: 2160px;
}

video {
  width: 100%;
  height: 100%;
  min-width: 2160px;
  max-height: 1200px;
  object-fit: cover;
  border: 10px solid #fff;
  border-radius: 80px;
}

.video-actions {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 120px;
}

.left, .center, .right {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}


.video-track {
  margin: 40px 0;
  width: 100%;
  height: 100%;
  max-height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.time {
  font-size: 40px;
  font-weight: 700;
}

.track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(rgba(0, 189, 249, 1), rgba(0, 50, 228, 1));

  &::before {
    position: absolute;
    content: " ";
    width: v-bind(progress);
    height: 100%;
    background: linear-gradient(rgba(255, 235, 130, 1), rgba(255, 177, 105, 1), rgba(255, 127, 106, 1));
    border-radius: 100px;
  }
}

.btn {
  padding: 0;
}
</style>