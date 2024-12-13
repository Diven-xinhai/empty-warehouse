<template>
  <div class="scroll-container" h-full>
    <div class="scroll-content" ref="scrollContentRef" h-full>
      <div
        :class="[
          'item',
          selectIndex ? 'unactive-style' : '',
          selectIndex && selectIndex === index ? 'active-style' : '',
        ]"
        h-full
        v-for="(item, index) in scrollingList"
        :key="item"
        :style="{ width: itemWidth + 'px', marginRight: space + 'px' }"
        @mouseenter="handleMouseenter(index)"
        @mouseleave="handleMouseLeave"
      >
        <NuxtImg class="img" :src="item" loading="lazy" placeholder />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { throttle } from "lodash-es";
const props = defineProps({
  // 数据列表
  list: {
    type: Array,
    default: () => [],
  },
  // 数组对象中提取的key值
  keyName: {
    type: String,
    default: "",
  },
  // 显示的数量
  showCount: {
    type: Number,
    default: 1,
  },
  // 间隔px
  space: {
    type: Number,
    default: 0,
  },
});

const selectIndex = ref<number | null>(null);
// 动画
const animationFrame = ref<number | null>(null);
// 渲染的数据列表
const scrollingList = ref();
// 每个item的像素宽度
const itemWidth = ref(0);
// 最外层盒子的像素宽度
const scrollContainerWidth = ref(0);
// 列表父级元素 ref
const scrollContentRef = ref<HTMLElement | null>();
let scrollContentWidth = 0

/**
 * @description: 开始动画
 */
const startScroll = () => {
  if (scrollContainerWidth.value - scrollContentWidth <= 0) {
    return
  }

  scrollingList.value = [...props.list, ...props.list].map(
    (item: any) => item[props.keyName]
  )

  function animation() {
    if (Math.floor(scrollContentRef.value!.scrollLeft) < scrollContainerWidth.value) {
      scrollContentRef.value!.scrollLeft += 1;
    } else {
      scrollContentRef.value!.scrollLeft = 0;
    }

    animationFrame.value = requestAnimationFrame(animation);
  }

  animation()
};

/**
 * @description: 计算宽度
 */
const calculate = () => {
  // 获取item百分比
  const itemWidthPercentage = Number((100 / props.showCount).toFixed(1));

  // 获取item像素宽度
  itemWidth.value =
    scrollContentRef.value!.clientWidth * (itemWidthPercentage * 0.01);
  
  scrollContentWidth = scrollContentRef.value!.clientWidth

  // 获取最外层宽度
  scrollContainerWidth.value =
    (itemWidth.value + props.space) * props.list.length;
};

/**
 * @description: 鼠标移出
 */
const handleMouseenter = (index: number) => {
  selectIndex.value = index;
  cancelAnimationFrame(animationFrame.value!);
};

/**
 * @description: 鼠标移出
 */
const handleMouseLeave = () => {
  selectIndex.value = null;
  startScroll();
};

/**
 * @description: 浏览器宽度改变执行方法
 */
const handleResize = () => {
  cancelAnimationFrame(animationFrame.value!);
  calculate();
  startScroll();
};

const throttledHandleResize = throttle(handleResize, 500);

watch(() => props.list, () => {
  if (props.keyName) {
    cancelAnimationFrame(animationFrame.value!);
    scrollContentRef.value!.scrollLeft = 0
    scrollingList.value = [...props.list].map(
      (item: any) => item[props.keyName]
    );
    nextTick(() => {
      calculate();
      startScroll();
    })
  }
})

onMounted(async () => {
  await nextTick();

  if (props.keyName) {
    scrollingList.value = [...props.list].map(
      (item: any) => item[props.keyName]
    );
  }
  calculate();
  startScroll();
  window.addEventListener("resize", throttledHandleResize);
});
onUnmounted(() => {
  cancelAnimationFrame(animationFrame.value!);
  window.removeEventListener("resize", throttledHandleResize);
});
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  .scroll-content {
    overflow-x: scroll;
    white-space: nowrap;
    position: relative;
    /* 隐藏元素内的滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      display: inline-block;
      transition: opacity 0.5s;
      .img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}

.unactive-style {
  opacity: 0.5;
}
.active-style {
  opacity: 1;
}
</style>
