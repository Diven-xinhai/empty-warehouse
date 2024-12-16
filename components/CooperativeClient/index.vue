<script lang="ts" setup>
import AppInfiniteScrolling from '@/components/AppInfiniteScrolling/index.vue'

const list = [
  {
    id: 1,
    url: 'images/home/img-client1.png',
  },
  {
    id: 2,
    url: 'images/home/img-client2.png',
  },
  {
    id: 3,
    url: 'images/home/img-client3.png',
  },
  {
    id: 4,
    url: 'images/home/img-client4.png',
  },
  {
    id: 5,
    url: 'images/home/img-client5.png',
  },
  {
    id: 6,
    url: 'images/home/img-client6.png',
  },
  {
    id: 7,
    url: 'images/home/img-client7.png',
  },
  {
    id: 8,
    url: 'images/home/img-client8.png',
  },
  {
    id: 9,
    url: 'images/home/img-client9.png',
  },
  {
    id: 10,
    url: 'images/home/img-client10.png',
  },
  {
    id: 11,
    url: 'images/home/img-client11.png',
  },
  {
    id: 12,
    url: 'images/home/img-client12.png',
  },
]
</script>

<template>
  <div class="cooperative-client lg:flex hidden" relative>
    <NuxtImg src="images/home/bg1.gif" loading="lazy" absolute left="50%" class="-translate-x-1/2" />
    <div relative z="2">
      <p data-aos="fade-right" class="title">
        合作客户
      </p>
      <p data-aos="fade-right" class="sub-title">
        Cooperative merchant
      </p>

      <div class="swiper-box">
        <AppInfiniteScrolling
          :list="list"
          key-name="url"
          :show-count="11"
          :space="25"
        />
      </div>
    </div>
  </div>
  <div class="lg:hidden block mb-40px">
    <div class="text-center mb-40px">
      <div class="text-18px">
        合作客户
      </div>
      <div class="text-14px text-#747679">
        Cooperative merchant
      </div>
    </div>
    <div class="grid grid-cols-4 gap-10px px-10px box-border">
      <NuxtImg
        v-for="item in list" :key="item.id" w-full :src="item.url" loading="lazy"
        border="1px dashed #cbcbcc"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cooperative-client {
  height: 100vh;
  min-height: 100vh;
  max-height: 700px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: #fff;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position-x: center;
  background-position-y: center;
  background-color: #000000;
  .title {
    height: 45px;
    font-size: 28px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    line-height: 45px;
    letter-spacing: 1px;
    margin-top: 50px;
  }
  .sub-title {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 1px;
    margin-top: 23px;
  }
  .swiper-box {
    width: 100%;
    margin: 100px 0 5% 0;
    :deep(.swiper-wrapper) {
      transition-timing-function: linear;
    }
    .item {
      width: 100%;
      text-align: center;
      border-radius: 5px;
      overflow: hidden;
      transition: opacity 0.5s;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .unactive-style {
      opacity: 0.5;
    }
    .active-style {
      opacity: 1;
    }
    .active-item {
      color: tomato;
    }
    .btns {
      margin-top: 20px;
    }
  }
}
</style>
