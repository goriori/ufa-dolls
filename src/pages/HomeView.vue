<script setup lang="ts">
import { axiosInstance } from '@/utils/axios/axios.ts'

const getSome = async () => {
  const res = await axiosInstance.get('/todos/2')
  console.log(res.data)
}
</script>
<template>
  <div>
    <button @click="getSome">click</button>
  </div>
</template>

<style scoped></style>
