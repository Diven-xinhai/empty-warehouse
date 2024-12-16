<script setup lang="ts">
import AOS from 'aos'

onMounted(() => {
  AOS.init({
    easing: 'ease-out',
    duration: 800,
  })

  /// 指定 window.name 用于子应用通过 window.open(, opener.name) 跳回之前 Tab 页面
  window.name = 'SineNux Portal'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
