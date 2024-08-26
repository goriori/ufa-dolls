<script setup lang="ts">
type BProps = {
  icon?: object,
  icon_left?: object,
  icon_right?: object,
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
    <section class="btn-icon" v-if="!icon">
      <component :is="icon_left"/>
    </section>
    <section class="btn-title" v-if="!icon">{{ title }}</section>
    <section class="btn-right" v-if="!icon">
      <component :is="icon_right"/>
    </section>
  </button>
</template>

<style scoped>


.btn {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 6px solid transparent;
  padding: 0 45px;
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