<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const isCollapse = useIsCollapse()

const loading = ref(false)

watchEffect(() => {
  loading.value = true
  const timer = setTimeout(() => {
    loading.value = false
  }, 500) // 模拟加载时间
  return () => clearTimeout(timer)
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <div
      v-loading.fullscreen.lock="loading"
      class="loading-overlay"
      element-loading-text="Loading..."
    />
    <div v-if="!loading" class="flex justify-between h-100vh overflow-hidden">
      <AppMenu />
      <div class="bg-#EFF4F6">
        <AppTopHeader />
        <AppTags />
        <div
          class="overflow-hidden bg-#EFF4F6 content-wrapper"
          :class="isCollapse ? 'content-wrapper-true' : 'content-wrapper-false'"
        >
          <el-scrollbar class="p-10px box-border">
            <slot />
          </el-scrollbar>
        </div>
      </div>
    </div>
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.content-wrapper {
  height: calc(100vh - 95px);
  transition: all 0.3s ease-in-out;
}
.content-wrapper-false {
  width: calc(100vw - $menu-width);
}
.content-wrapper-true {
  width: calc(100vw - 64px);
}
</style>
