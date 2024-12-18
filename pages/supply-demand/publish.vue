<script setup lang="ts">
const sceneType = ref<'service' | 'demand'>('demand')

const publishLoading = ref(false)

const router = useRouter()
function handlePublish() {
  publishLoading.value = true
  setTimeout(() => {
    publishLoading.value = false
    router.push('/supply-demand')
    ElMessage.success('发布成功')
  }, 2000)
}
</script>

<template>
  <div class="bg-#F8F9FB">
    <div w="2xl:1400px xl:90% lg:full" class="mt-70px mx-auto">
      <div class="py-10px pl-40px box-border text-14px flex items-center gap-5px">
        <span class="i-tabler:home-filled" />
        <NuxtLink to="/" class="font-normal">
          首页
        </NuxtLink> >
        <NuxtLink to="/supply-demand" class="font-normal">
          供需对接
        </NuxtLink> >
        <span class="font-bold">{{ sceneType === 'demand' ? '需求发布' : '服务发布' }}</span>
      </div>

      <div class="bg-white px-60px py-40px box-border">
        <div flex="~ justify-center">
          <div
            class="category-tab transition-all rounded-lt-2px rounded-lb-2px border-r-0!"
            :class="{ 'category-tab_active': sceneType === 'demand' }"
            @click="sceneType = 'demand'"
          >
            我有需求
          </div>
          <div
            class="category-tab transition-all rounded-rt-2px rounded-rb-2px border-l-0!"
            :class="{ 'category-tab_active': sceneType === 'service' }"
            @click="sceneType = 'service'"
          >
            我有服务
          </div>
        </div>

        <div class="mt-28px flex items-center">
          <div class="w-4px h-28px bg-#3F80E4 rounded-2px" />
          <div class="text-#030718 text-20px ml-16px">
            服务内容
          </div>
        </div>

        <div class="mt-28px flex items-center">
          <div class="w-4px h-28px bg-#3F80E4 rounded-2px" />
          <div class="text-#030718 text-20px ml-16px">
            服务补充
          </div>
        </div>

        <div
          text="white"
          flex="~ items-center justify-center"
          class="group relative overflow-hidden w-230px h-44px rounded-4px mx-auto bg-[linear-gradient(90deg,#68A9FD_0%,#3A7BE1_100%)] cursor-pointer select-none"
          @click="handlePublish"
        >
          <span v-show="!publishLoading" class="i-tabler:arrow-right text-18px absolute -left-50px group-hover:left-60px transition-all" />
          提交发布
          <span v-if="publishLoading" class="i-tabler:loader ml-10px animate-spin text-18px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-tab {
  color: #3F80E4;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 201px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #3F80E4;
  user-select: none;

  &_active {
    color: white;
    background: linear-gradient( 90deg, #68A9FD 0%, #3A7BE1 100%);
  }
}
</style>
