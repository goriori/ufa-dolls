<script setup lang="ts">

import {ref, VNodeRef} from "vue";
import {useRegular} from "@/utils/useRegular";
import Modal from "@/components/ui/modals/Modal.vue";
import Button from "@/components/ui/button/Button.vue";
import SuccessVideo from "@/components/ui/svg/SuccessVideo.vue";
import Input from "@/components/ui/input/Input.vue";
import Email from "@/components/ui/svg/Email.vue";
import ComeBack from "@/components/ui/svg/ComeBack.vue";
import Keyboard from "@/components/ui/keyboard/Keyboard.vue";
import Cross from "@/components/ui/svg/Cross.vue";

type MProps = {
  videoSrc: string
}
export type Form = {
  email: {
    ref: VNodeRef | null
    state: 'default' | 'success' | 'error'
    value: string
    focus: boolean
    positionCursorStart: number,
    positionCursorEnd: number
  }
}

type MEmits = {
  (eventName: 'onClose'): void
  (eventName: 'onInvalidEmail'): void
  (eventName: 'onSendEmail', form: Form): void
  (eventName: 'onToMain'): void
}
const form = ref<Form>({
  email: {
    ref: null,
    state: 'default',
    value: '',
    focus: false,
    positionCursorStart: 0,
    positionCursorEnd: 0
  },
})
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const {emailTest} = useRegular()

const onFocusField = () => {
  const startPositionCursor = Number((form.value.email.ref as HTMLInputElement).selectionStart)
  const endPositionCursor = Number((form.value.email.ref as HTMLInputElement).selectionEnd)
  form.value.email.positionCursorStart = startPositionCursor
  form.value.email.positionCursorEnd = endPositionCursor
  form.value.email.focus = true
}

const onPressKey = (field: keyof Form, value: string) => {
  console.log(field, value, form.value)
  const targetField = form.value[field]
  targetField.value =
      targetField.value.substring(0, targetField.positionCursorStart)
      +
      value
      + targetField.value.substring(targetField.positionCursorEnd);
  targetField.positionCursorStart += 1;
  targetField.positionCursorEnd += 1;
  (targetField.ref as HTMLInputElement).setSelectionRange(targetField.positionCursorStart, targetField.positionCursorEnd)
  console.log(targetField)
}

const onBackspace = (field: keyof Form) => {
  const targetField = form.value[field]
  if (targetField.value.length == targetField.positionCursorStart || targetField.value.length == targetField.positionCursorEnd) {
    targetField.value = targetField.value.slice(0, targetField.value.length - 1)
  } else {
    const leftValue = targetField.value.slice(0, targetField.positionCursorStart - 1)
    const rightValue = targetField.value.slice(targetField.positionCursorStart, targetField.value.length)
    targetField.value = leftValue + rightValue
    targetField.positionCursorStart -= 1
    targetField.positionCursorEnd -= 1
  }

}

const onClose = () => emits('onClose')
const onSendEmail = () => {
  if (!emailTest(form.value.email.value)) {
    form.value.email.state = 'error'
    return emits('onInvalidEmail')
  }
  form.value.email.state = 'success'
  return emits('onSendEmail', form.value)
}
const onToMain = () => emits('onToMain')

</script>

<template>
  <Modal>
    <template #window>
      <div class="window" v-outside="()=>{
         form.email.focus = false
      }">
        <section class="window-top">
          <SuccessVideo/>
          <Cross @click="onClose" class="cross"/>
        </section>
        <section class="window-center">
          <h1 class="message">Вы успешно записали сказку</h1>
          <div class="input">
            <Input
                v-model="form.email.value"
                type="text"
                placeholder="Адрес электронной почты"
                color="secondary"
                class="inpt"
                :state="form.email.state"
                @click="onFocusField"
                @on-mount="(element)=> form.email.ref = element"
            />
            <p v-if="form.email.state === 'error'" class="input-error">Введите корректный адрес электронной почты</p>
          </div>
          <Transition name="fade">
            <Keyboard v-if="form.email.focus" @on-enter="form.email.focus = false"
                      @on-press="(key:string)=> onPressKey('email', key)"
                      @on-backspace="onBackspace('email')"
            />
          </Transition>
        </section>
        <section class="window-bottom">
          <Button :icon_left="Email" color="primary" title="Отправить на почту" class="btn btn-email"
                  @click="onSendEmail"/>
          <Button :icon_left="ComeBack" color="thridy" title="Вернуться на главный экран" class="btn btn-to-main"
                  @click="onToMain"/>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1500px;
  max-height: 1080px;
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

  .cross {
    position: absolute;
    cursor: pointer;
    top: 250px;
    right: -150px;
    transition: 0.3s all ease-in-out;
    &:active {
      transform: scale(0.9);
    }
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
  font-size: 30px;
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

.keyboard {
  bottom: -500px;
  left: 50%;
}

.video {
  width: 100%;
  height: 100%;
  max-height: 670px;
  border-radius: 40px;
  border: 10px solid white;
  object-fit: cover;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  .input-error {
    text-align: left;
    color: #ea3c41;
  }
}

.btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-height: 150px;
  padding: 43px;
}

.btn-email {
  gap: 226px;
}

.btn-to-main {
  gap: 114px;
}

.message {
  font-size: 70px;
}
</style>