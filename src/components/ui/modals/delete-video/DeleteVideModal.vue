<script setup lang="ts">

import Modal from "@/components/ui/modals/Modal.vue";
import Button from "@/components/ui/button/Button.vue";
import Cross from "@/components/ui/svg/Cross.vue";

type MEmits = {
  (eventName: 'onClose'): void
  (eventName: 'onDelete'): void
  (eventName: 'onCancel'): void
}
const emits = defineEmits<MEmits>()
const onClose = () => emits('onClose')
const onDelete = () => emits('onDelete')
const onCancel = () => emits('onCancel')
</script>

<template>
  <Modal>
    <template #window>
      <div class="window">
        <section class="window-top">
          <Cross class="cross" @click="onClose"/>
          <hr>
        </section>
        <section class="window-center">
          <p>Это видео будет удалено. Вы уверены, что хотите удалить это видео?</p>
        </section>
        <section class="window-bottom">
          <Button color="primary" title="Удалить видео" class="btn" @click="onDelete"/>
          <Button color="thridy" title="Отменить" class="btn" @click="onCancel"/>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.window {
  width: 100%;
  height: 100%;
  max-width: 1500px;
  max-height: 1230px;
  border-radius: 80px;
  border: 10px solid rgba(212, 156, 255, 1);;
  background-color: rgba(53, 1, 137, 1);
  padding: 80px;
  display: flex;
  flex-direction: column;
}

.window-top {
  height: 100%;
  max-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 100px;
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
  color: #ffffff;
  font-size: 100px;
  font-weight: 600;
  text-align: center;
}

.window-bottom {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 150px;

}
</style>