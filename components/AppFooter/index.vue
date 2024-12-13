<script setup lang="ts">
const infos = [
  {
    photo: 'images/pc/footer/mobphone.png',
    name: "总部电话",
    value: "15194161990",
  },
  // {
  //   photo: 'images/pc/footer/wx.png',
  //   name: "客服微信",
  //   value: "15169050007",
  // },
  {
    photo: 'images/pc/footer/phone.png',
    name: "固话",
    value: "0531-58252556",
  },
  {
    photo: 'images/pc/footer/email.png',
    name: "企业邮箱",
    value: "sdqn@qingniaoiiot.com",
  },
  {
    photo: 'images/pc/footer/address.png',
    name: "地 址",
    value: "山东省济南市历下区姚家街道茂陵三号路万科中心写字楼3007",
  },
];

const qrcode = [
  {
    name: "微信公众号",
    photo: 'images/pc/footer/gzh.png',
  },
  {
    name: "联系我们",
    photo: 'images/pc/footer/gzh.png',
  },
];
</script>

<template>
  <div min-h="400px" bg-black>
    <div flex="~ items-center lg:row col" p="2xl:100px lg:50px" box-border>
      <div flex="~ wrap" w="lg:70% 90%" mt="lg:0 20px" border="lg:none 0 b-1px solid #979797" pb="lg:0 10px">
        <div v-for="item in infos" :key="item.name" flex="~ items-center" w="lg:(50% last:100%) first:100% 100%" mb="lg:40px 10px" text="white" class="group">
          <div flex="~ items-center" w="lg:(30% group-last:15% group-first:15%) 30%">
            <NuxtImg h="lg:20px 15px" :src="item.photo" loading="lazy"></NuxtImg>
            <div ml="10px" text="lg:16px 14px">{{ item.name }}</div>
          </div>
          <div flex="1" w-0 text="lg:group-first:35px lg:16px 14px">{{ item.value }}</div>
        </div>
      </div>
      <div flex="~ justify-around items-center" w="lg:30% 90%" order="lg:2 -1" py="lg:0 20px" border="lg:none 0 b-1px solid #979797">
        <NuxtImg w="80px" src="images/mb/footer/logo.png" class="lg:hidden block"></NuxtImg>
        <div v-for="item in qrcode" :key="item.name" text="center">
          <NuxtImg w="80px" :src="item.photo" loading="lazy"></NuxtImg>
          <div text="white lg:16px 14px" mt="10px">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div w="94%" mx="auto" text="center lg:16px 12px #9a9a9a" py="20px" mt="lg:20px" box-border border="none 0 t-1px lg:solid #979797">
      Copyright © 2023 Usr All Rights Reserved. 鲁ICP备20020929号 山东青鸟工业互联网有限公司
    </div>
  </div>
</template>