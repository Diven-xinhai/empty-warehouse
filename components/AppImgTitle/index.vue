<template>
  <div class="app-img-title">
    <NuxtImg v-if="pcImg" class="lg:block hidden h-60px mx-auto my-0" :src="pcImg" />
    <NuxtImg v-if="mbImg" class="lg:hidden h-18px" :src="mbImg" />
  </div>
</template>

<script setup>
defineProps({
  pcImg: {
    type: String,
    default: ''
  },
  mbImg: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
</style>
