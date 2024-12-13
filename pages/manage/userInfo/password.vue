<script setup lang="tsx">
import type { Swiper } from "swiper";
definePageMeta({
  layout: 'manage',
})

</script>

<template>
  <div>
    我是修改密码页面
  </div>
</template>

<style scoped lang="scss">
  @font-face {
    font-family: 'gf';
    src: url('@/assets/fonts/gf.otf');
    font-display: swap;
  }

  :deep(.swiper-pagination-bullet) {
    background-color: rgba($color: #ffffff, $alpha: 0.9);
  }
  :deep(.swiper-pagination-bullet-active) {
    background-color: #fff;
  }

 .v-enter-active,
  .v-leave-active {
    transition: opacity 1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

<style>
.identify .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  bottom: 0px;
  background: #6D7278 !important;
  opacity: 0.15;
}
.identify .swiper-pagination-bullet-active {
  opacity: 1;
}

@media (min-width: 1024px) {
  .identify .swiper-pagination {
    display: none;
  }
}
</style>