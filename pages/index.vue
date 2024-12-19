<script setup lang="ts">
import NoticeSection from "./home/components/NoticeSection.vue";
import Entrance from "./home/components/Entrance.vue";
import SupplyDemand from "./home/components/SupplyDemand.vue";
import Achievement from "./home/components/Achievement.vue";


</script>

<template>
  <div class="pt-70px pb-40px bg-#F6F6F9">
    <NuxtImg class="lg:block hidden w-full" src="images/pc/home/banner.png" />
    <NuxtImg class="lg:hidden w-full" src="images/mb/home/banner.png" />
    
    <div class="lg:max-w-1200px lg:w-80% mx-auto w-full">
      <!-- 通知公告区域 -->
      <NoticeSection class="lg:mt-40px mt-10px"></NoticeSection>

      <div class="lg:block hidden advertisement text-center text-#fff text-24px mt-40px">
       <div class="flex items-center justify-center ">
          <div class="w-100px h-1px bg-#fff"></div>
          <div class="mx-20px">
            已入驻服务商200+
          </div>
          <div class="w-100px h-1px bg-#fff"></div>
       </div>
      </div>

      <!-- 入口 -->
      <Entrance></Entrance>

      <!-- 供需对接 -->
      <SupplyDemand class="lg:mt-40px mt-10px"></SupplyDemand>

      <!-- 成果发布 -->
      <Achievement class="lg:mt-40px mt-10px"></Achievement>

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
