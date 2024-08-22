<script setup lang="ts">
type BProps = {
  icon?: object,
  title?: string,
  color: 'primary' | 'secondary' | 'thridy'
}
defineProps<BProps>()
</script>

<template>
  <button :class="['btn', color]" v-ripple>
    <section class="btn-icon" v-if="icon">
      <component :is="icon"/>
    </section>
    <section class="btn-title">{{ title }}</section>
  </button>
</template>

<style scoped>


.btn {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 6px solid transparent;
  font-size: 50px;
  font-weight: 700;
  color: #fff;
  background-color: transparent;
  border-radius: 20px;
}

.btn-icon {
  display: flex;
}

.primary {
  background: var(--primary-btn-color);
  border-color: var(--primary-border-color);
}

.secondary {
  background: var(--secondary-btn-color);
  border-color: var(--secondary-border-color);
}

.thridy {
  background: var(--thridy-btn-color);
  border-color: var(--thridy-border-color);
}
</style>