<script setup lang="ts">

</script>

<template>
  <article class="card">
    <section class="card-top">
      <slot name="card-top"/>
    </section>
    <section class="card-center">
      <slot name="card-center"/>
    </section>
    <section class="card-bottom">
      <slot name="card-bottom"/>
    </section>
  </article>
</template>

<style scoped>

</style>