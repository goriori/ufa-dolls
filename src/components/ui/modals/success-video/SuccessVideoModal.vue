<script setup lang="ts">

import Modal from "@/components/ui/modals/Modal.vue";
import Button from "@/components/ui/button/Button.vue";
import SuccessVideo from "@/components/ui/svg/SuccessVideo.vue";
import Input from "@/components/ui/input/Input.vue";
import Email from "@/components/ui/svg/Email.vue";
import ComeBack from "@/components/ui/svg/ComeBack.vue";

type MProps = {
  videoSrc: string
}
type Form = {
  email: string
}

type MEmits = {
  (eventName: 'onSendEmail', form: Form): void
  (eventName: 'onToMain'): void
}
const form = {
  email: '',
}
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const onSendEmail = () => {
  emits('onSendEmail', form)
}
const onToMain = () => emits('onToMain')
</script>

<template>
  <Modal>
    <template #window>
      <div class="window">
        <section class="window-top">
          <SuccessVideo/>
        </section>
        <section class="window-center">
          <video class="video" :src="videoSrc"></video>
          <Input v-model="form.email" type="email" placeholder="Адрес электронной почты" color="secondary"
                 class="inpt"/>
        </section>
        <section class="window-bottom">
          <Button :icon="Email" color="primary" title="Отправить на почту" class="btn" @click="onSendEmail"/>
          <Button :icon="ComeBack" color="thridy" title="Вернуться на главный экран" class="btn" @click="onToMain"/>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.window {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1500px;
  max-height: 1580px;
  border-radius: 80px;
  border: 10px solid rgba(212, 156, 255, 1);;
  background-color: rgba(53, 1, 137, 1);
  padding: 0 80px;
  display: flex;
  flex-direction: column;
}

.window-top {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translate(-50%, 0);
  max-height: 285px;
  display: flex;
  justify-content: center;
}

.cross {
  cursor: pointer;
  transition: 0.3s all ease-in-out;

  &:active {
    transform: scale(0.9);
  }
}

hr {
  background: linear-gradient(rgba(70, 34, 157, 0), rgba(255, 255, 255, 1), rgba(70, 34, 157, 0));
  width: 100%;
  height: 100%;
  max-height: 10px;
  flex: 1 0 50%;
}

.window-center {
  margin-top: 150px;
  color: #ffffff;
  font-size: 100px;
  font-weight: 600;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

.window-bottom {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.video {
  width: 100%;
  height: 100%;
  max-height: 670px;
  border-radius: 40px;
  border: 10px solid white;
  object-fit: cover;
}

.btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 150px;
  gap: 100px;

}
</style>