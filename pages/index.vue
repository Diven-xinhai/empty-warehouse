<script setup lang="ts">
import NoticeSection from "./home/components/NoticeSection.vue";


</script>

<template>
  <div class="pt-70px bg-#F6F6F9">
    <NuxtImg class="lg:block hidden w-full" src="images/pc/home/banner.png" />
    <NuxtImg class="lg:hidden w-full" src="images/mb/home/banner.png" />
    
    <div class="lg:w-1200px w-full mx-auto">
      <!-- 通知公告区域 -->
      <NoticeSection></NoticeSection>

      <div class="advertisement flex items-center justify-center text-center text-#fff text-24px mt-40px">
        <div class="w-100px h-1px bg-#fff"></div>
        <div class="mx-20px">
          已入驻服务商200+
        </div>
        <div class="w-100px h-1px bg-#fff"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@font-face {
  font-family: 'gf';
  src: url('@/assets/fonts/gf.otf');
  font-display: swap;
}

.advertisement {
  height: 100px;
  line-height: 100px;
  background-image: url('/public/images/pc/home/gg1.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  overflow: hidden;
}
</style>
