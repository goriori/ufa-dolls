<script setup lang="ts">
</script>

<template>
  <article class="hint" v-ripple >
    <slot name="content"/>
  </article>
</template>

<style scoped>

.hint {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  border: 3px solid rgba(212, 156, 255, 1);
  background: linear-gradient(rgba(125, 38, 255, 1),rgba(40, 0, 124, 1));
  transition: 0.3s all ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
}
</style>