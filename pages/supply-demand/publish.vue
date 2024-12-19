<script setup lang="ts">
const sceneType = ref<'service' | 'demand'>('demand')

function useInitializationData() {
  const { data: supplyDemandCategories } = useAsyncData(() => $fetch('/api/supply-demand/categories'))

  const UPLOAD_FILE_URL = `${import.meta.env.VITE_GLOB_API_URL}/hulk-resource/oss/endpoint/put-file`
  const TOKEN = ref('')
  onMounted(() => TOKEN.value = `bearer ${getLocalStore('token')}`)

  async function lazyLoadCityData(node: any, resolve: any) {
    const { level, data } = node

    if (level === 0) {
      return request('/hulk-system/dict/dictionary?code=city')
        .then(res => resolve(res.data))
    }
    else if (level === 1) {
      return request(`/hulk-system/region/select?code=${data.dictKey}`)
        .then(res => resolve(res.data.map((item: any) => ({
          leaf: true,
          dictValue: item.name,
        }))))
    }
    resolve()
  }

  const userInfo = ref<any>()
  onMounted(() => {
    userInfo.value = getLocalStore('userInfo')
  })

  return {
    lazyLoadCityData,
    userInfo,
    supplyDemandCategories,
    UPLOAD_FILE_URL,
    TOKEN,
  }
}
const initializationData = useInitializationData()

const demandFormRef = useTemplateRef<{ validate: () => Promise<any> }>('demandFormRef')

const router = useRouter()
const publishLoading = ref(false)
async function handlePublish() {
  try {
    const values = await demandFormRef.value?.validate()
    publishLoading.value = true
    await request('/demand/save', {
      method: 'POST',
      body: {
        ...values.value,
        city: values.value.area[0],
        district: values.value.area[1],
        enterpriseName: initializationData.userInfo.value.enterprise_name,
      },
    })
    router.push('/supply-demand')
    ElMessage.success('发布成功')
  }
  catch {}
  finally {
    publishLoading.value = false
  }
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

        <!-- 需求表单 -->
        <SupplyDemandForm
          v-if="sceneType === 'demand'"
          ref="demandFormRef"
          :initialization-data="initializationData"
        />
        <!-- 服务表单 -->
        <SupplyDemandServiceForm v-else />

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

:deep(.el-upload--picture-card),
:deep(.el-upload-list__item) {
  width: 100px;
  height: 100px;
}
</style>
