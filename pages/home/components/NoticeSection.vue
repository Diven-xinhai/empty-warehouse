<script setup lang="ts">
import AppImgTitle from "@/components/AppImgTitle/index.vue";

const selectType = ref(0)

const selectList = [
  {
    title: '通知公告',
    img: 'images/common/title.png',
    imgActive: 'images/common/title-active.png'
  },
  {
    title: '政策资讯',
    img: 'images/common/title.png',
    imgActive: 'images/common/title-active.png'
  },
]

const noticeList = ref([
  {
    title: '关于2023年11月1日-2023年11月15日“企业年审”dates啊实打实的啊实打实的',
    time: '2023-09-01'
  },
  {
    title: '关于2023年11月1日-2023年11月15日“企业年审”date大的s',
    time: '2023-09-01'
  },
])

function handleSelectType(index: number) {
  selectType.value = index
  console.log(selectType.value)
}
</script>

<template>
  <!-- 通知公告区域 -->
  <div class="container mx-auto p-15px lg:p-0 box-border">
      <AppImgTitle 
        pc-img="images/pc/home/tzgg.png" 
        mb-img="images/mb/home/tzgg.png"
      />
      <div class="lg:block hidden text-right color-#999 text-14px mt-20px cursor-pointer">查看更多 ></div>
      <div class="flex justify-between flex-wrap mt-15px">
        <div class="lg:w-[calc(50%-20px)] w-full box-border rounded-10px truncate">
          <img width="100%" class="block" src="/public/images/pc/home/banner.png" />
        </div>
        <div class="lg:w-50% w-full bg-#fff p-10px box-border">
          <div class="flex justify-between p-10px pt-5px" border="none 0 b-1px solid #eee">
            <div class="w-80% flex">
              <div class="flex items-center mr-20px cursor-pointer " :class="[selectType === index ? 'color-#333' : 'color-#71737B']" v-for="(item, index) in selectList" :key="index" @click="handleSelectType(index)">
                <img class="w-15px pr-10px" :src="selectType === index ? item.imgActive : item.img" />
                {{item.title}}
              </div>
            </div>
            <div class="lg:hidden block text-right color-#999 text-14px">更多 ></div>
          </div>

          <div class="pl-10px">
            <div v-for="(item, index) in noticeList" :key="index" class="p-10px pl-20px cursor-pointer notice-list-item">
              <div class="text-ellipsis overflow-hidden whitespace-nowrap hover:text-#3F80E4">
                {{ item.title }}
              </div>
              <div class="mt-5px color-#999 text-14px">
                {{ item.time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.notice-list-item {
  position: relative;
  &::before {
    content: '';
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: #3F80E4;
    left: 0;
    top: 17px;
  }
}
</style>
