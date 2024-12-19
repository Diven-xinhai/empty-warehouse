<template>
  <div class="container mx-auto lg:p-0 lg:mt-40px p-15px box-border">
    <div class="flex justify-between">
      <NuxtImg class="w-[calc(50%-10px)] lg:block hidden mx-auto my-0 cursor-pointer" src="images/pc/home/zfrk.png" />
      <NuxtImg class="w-[calc(50%-10px)] lg:block hidden mx-auto my-0 cursor-pointer" src="images/pc/home/gsrk.png" />

      <NuxtImg class="w-[calc(50%-10px)] lg:hidden block cursor-pointer" src="images/mb/home/zfrk.png" />
      <NuxtImg class="w-[calc(50%-10px)] lg:hidden block cursor-pointer" src="images/mb/home/gsrk.png" />

    </div>
  </div>
</template>

<script setup lang="ts">

const list = [
  {
    pc: 'images/pc/home/zfrk.png',
    mb: 'images/pc/home/gsrk.png'
  },
  {
    pc: 'images/mb/home/zfrk.png',
    mb: 'images/mb/home/gsrk.png'
  }
]

</script>

<style lang="scss" scoped>
</style>
