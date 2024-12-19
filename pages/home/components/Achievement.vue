<script setup lang="ts">
import AppImgTitle from "@/components/AppImgTitle/index.vue";

const list = ref([
  {
    title: '成果展示',
    desc: '全方位展示创新成果',
  },
  {
    title: '成果展示',
    desc: '全方位展示创新成果',
  },
  {
    title: '成果展示',
    desc: '全方位展示创新成果',
  },
])
</script>

<template>
  <div class="supply-demand container mx-auto p-15px lg:p-0 box-border relative">
      <AppImgTitle 
        pc-img="images/pc/home/cgfb.png" 
        mb-img="images/mb/home/cgfb.png"
      />
      <div class="lg:hidden absolute top-15px right-15px color-#999 text-14px cursor-pointer">
        更多 >
      </div>
      <div class="lg:block hidden text-right color-#999 text-14px mt-20px cursor-pointer">
        查看更多 >
      </div>

      <div class="flex flex-wrap justify-between flex-wrap mt-15px lg:bg-#fff lg:p-10px">
       <div class="lg:w-33.3% w-100% lg:p-10px lg:m-0  mb-15px box-border cursor-pointer relative lg:rounded-0px rounded-10px overflow-hidden" v-for="(item, index) in list" :key="index">
        <img class="w-100%" src="~/assets/images/consult.png" />
        <div class="lg:block hidden">
          <p class="text-18px font-bold mt-15px ">{{item.title}}</p>
          <p class="text-14px mt-10px ">{{item.desc}}</p>
        </div>
        <div class="lg:hidden block absolute bottom-0 left-0 bg-[rgba(0,0,0,0.5)] w-full p-10px box-border">
          <p class="text-18px font-bold color-#fff">{{item.title}}</p>
          <p class="text-14px mt-10px color-#fff">{{item.desc}}</p>
        </div>
       </div>
      </div>
      
    </div>
</template>

<style lang="scss">
</style>
