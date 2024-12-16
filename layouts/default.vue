<script setup lang="ts">
const headerRef = ref()
provide('app-to-link', (url: string, name: string) => {
  headerRef.value.toLink(url, name)
})
</script>

<template>
  <AppHeader ref="headerRef" />
  <slot />
  <AppFooter />
</template>
