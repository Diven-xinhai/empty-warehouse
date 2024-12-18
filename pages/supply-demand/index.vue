<script setup lang="ts">
const sceneType = ref<'service' | 'demand'>('service')
function switchCategory(value: 'service' | 'demand') {
  sceneType.value = value
  selectedFilterContext.value = {
    cities: ['全部'],
    services: [],
    industries: [],
    prices: [],
  }
  requestList()
}

function useListQueryParams() {
  const { data: supplyDemandCategories } = useAsyncData(() => $fetch('/api/supply-demand/categories'))
  const categories = computed(() => {
    const data = supplyDemandCategories.value
    return sceneType.value === 'service' ? data?.serviceHall : data?.demandHall
  })

  const selectedFilterContext = ref<{ cities: string[], services: string[], industries: string[], prices: string[] }>({
    cities: ['全部'],
    services: [],
    industries: [],
    prices: [],
  })

  const selectedFilterContextFlat = computed(() => {
    return Object.values(selectedFilterContext.value).flat()
  })

  function handleSelectedFilterContext(value: string, type: keyof typeof selectedFilterContext.value) {
    const values = selectedFilterContext.value[type]

    if (type === 'cities') {
      if (value === categories.value?.cities[0]) {
        return values.splice(0, values.length, value)
      }
      else if (values.at(0) === categories.value?.cities[0]) {
        values.splice(0, 1)
      }
    }

    const index = values.indexOf(value)
    if (~index) {
      values.splice(index, 1)
    }
    else {
      values.push(value)
    }
  }
  function removeSelectedFilterContext(value: string) {
    const values = Object.values(selectedFilterContext.value)
    for (const items of values) {
      const index = items.indexOf(value)
      if (~index) {
        items.splice(index, 1)
        break
      }
    }
  }

  return {
    categories,
    selectedFilterContext,
    selectedFilterContextFlat,
    handleSelectedFilterContext,
    removeSelectedFilterContext,
  }
}
const {
  categories,
  selectedFilterContext,
  selectedFilterContextFlat,
  handleSelectedFilterContext,
  removeSelectedFilterContext,
} = useListQueryParams()

const isRevealIndustryAndPriceFilterCol = computed(() => {
  if (sceneType.value === 'demand') {
    return true
  }

  return selectedFilterContext.value.services.includes('解决方案')
})

function useSupplyDemandList() {
  interface SupplyDemandItem {
    id: string
    title: string
    description: string
    amount: string
    tags: string[]
    image: string
    enterpriseName: string
  }

  const loading = ref(false)
  const { data: supplyDemandList } = useAsyncData<SupplyDemandItem[]>(requestList, { default: () => [] })

  async function requestList() {
    loading.value = true
    const url = `${import.meta.env.VITE_GLOB_API_URL}/demand/client/page`
    const res = await $fetch<{ data: PageResponse<any> }>(url, {
      method: 'POST',
      body: { current: 1, size: 10 },
    })
    loading.value = false
    return res.data.records.map(item => ({
      id: item.id,
      title: item.demandName,
      description: item.demandContent,
      amount: (item.budgetAmount / 100).toFixed(2),
      tags: [item.industry, item.sceneType].filter(Boolean),
      image: item.image,
      enterpriseName: item.enterpriseName,
    }))
  }

  return {
    loading,
    requestList,
    supplyDemandList,
  }
}
const { requestList, supplyDemandList, loading } = useSupplyDemandList()
</script>

<template>
  <div class="mt-70px relative">
    <NuxtImg
      width="100%"
      :height="388"
      src="/images/pc/supply-demand/banner.png"
    />
    <div class="absolute top-62px left-20%">
      <div text="#030718 48px">
        供需对接
      </div>
      <div
        text="#1C6AE1 18px"
        class="inline-block mt-15px px-5px py-10px box-border border-0 border-t-1px border-b-1px border-solid border-#3F80E4"
      >
        满足需求 - 合作桥梁 - 资源对接
      </div>
      <div text="#030718 20px" class="mt-10px w-500px">
        我们致力于成为需求满足与合作桥梁的角色，为资源供需有效对接提供支持
      </div>
      <NuxtLink to="/supply-demand/publish" class="hover:no-underline active:no-underline w-124px">
        <div
          class="group relative overflow-hidden flex items-center justify-center mt-20px rounded-4px w-124px leading-44px text-white text-20px bg-[linear-gradient(90deg,#68A9FD_0%,#3A7BE1_100%)] cursor-pointer select-none"
        >
          <span class="i-tabler:arrow-right absolute -left-50px group-hover:left-20px transition-all" />
          <span class="pl-0 group-hover:pl-10px inline-block transition-all">发 布</span>
        </div>
      </NuxtLink>
    </div>
  </div>

  <div class="bg-#F8F9FB">
    <div
      w="2xl:1400px xl:90% lg:full"
      class="bg-white pt-64px px-100px pb-20px box-border mx-auto"
    >
      <div class="w-60% mx-auto flex">
        <ElInput placeholder="输入关键字进行搜索">
          <template #prefix>
            <span class="i-tabler:zoom text-20px" />
          </template>
        </ElInput>
        <div
          text="white"
          flex="~ items-center justify-center"
          class="w-128px h-44px bg-[linear-gradient(90deg,#68A9FD_0%,#3A7BE1_100%)] cursor-pointer select-none"
          @click="!loading && requestList()"
        >
          搜 索
          <span v-if="loading" class="i-tabler:loader ml-10px animate-spin text-18px" />
        </div>
      </div>

      <div class="my-48px flex items-center">
        <div class="w-4px h-28px bg-#3F80E4 rounded-2px" />
        <div class="text-#030718 text-20px ml-16px">
          类型筛选
        </div>
      </div>
      <div flex="~ justify-center">
        <div
          class="category-tab transition-all rounded-lt-2px rounded-lb-2px border-r-0!"
          :class="{ 'category-tab_active': sceneType === 'service' }"
          @click="switchCategory('service')"
        >
          服务大厅
        </div>
        <div
          class="category-tab transition-all rounded-rt-2px rounded-rb-2px border-l-0!"
          :class="{ 'category-tab_active': sceneType === 'demand' }"
          @click="switchCategory('demand')"
        >
          需求大厅
        </div>
      </div>

      <div class="flex mt-37px mb-19px pb-18px border-0px border-b-1px border-solid border-#D0D4DB">
        <div class="filter-title">
          已选条件
        </div>

        <div v-if="selectedFilterContextFlat.length" flex="! gap-15px wrap" class="flex-1 w-0">
          <div
            v-for="item in selectedFilterContextFlat"
            :key="item"
            border="1px solid #3F80E4"
            flex="! items-center"
            class="bg-#3F80E4 bg-opacity-16 px-10px box-border text-#3F80E4 leading-28px rounded-2px"
          >
            {{ item }}
            <span
              v-if="item !== categories?.cities[0]"
              class="i-tabler:x ml-5px cursor-pointer"
              @click="removeSelectedFilterContext(item)"
            />
          </div>
        </div>
        <div v-else class="leading-28px text-14px text-gray">
          暂未选择任何筛选条件
        </div>
      </div>

      <div class="flex mb-40px">
        <div class="filter-title">
          所属城市
        </div>
        <div flex="! gap-15px wrap" class="flex-1 w-0">
          <div
            v-for="item in categories?.cities"
            :key="item"
            flex="! items-center"
            class="hover:(bg-#3F80E4 text-white) px-10px leading-28px rounded-2px cursor-pointer"
            :class="{ 'bg-#3F80E4 text-white': selectedFilterContextFlat.includes(item) }"
            @click="handleSelectedFilterContext(item, 'cities')"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="flex mb-40px">
        <div class="filter-title">
          服&emsp;&emsp;务
        </div>
        <div flex="! gap-15px wrap" class="flex-1 w-0">
          <div
            v-for="item in categories?.services"
            :key="item"
            flex="! items-center"
            class="hover:(bg-#3F80E4 text-white) px-10px leading-28px rounded-2px cursor-pointer"
            :class="{ 'bg-#3F80E4 text-white': selectedFilterContextFlat.includes(item) }"
            @click="handleSelectedFilterContext(item, 'services')"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div v-if="isRevealIndustryAndPriceFilterCol" class="flex mb-40px">
        <div class="filter-title">
          行&emsp;&emsp;业
        </div>
        <div flex="! gap-15px wrap" class="flex-1 w-0">
          <div
            v-for="item in categories?.industries"
            :key="item"
            flex="! items-center"
            class="text-#030718 px-10px leading-28px rounded-2px cursor-pointer hover:(bg-#3F80E4 text-white)"
            :class="{ 'bg-#3F80E4 text-white': selectedFilterContextFlat.includes(item) }"
            @click="handleSelectedFilterContext(item, 'industries')"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div v-if="isRevealIndustryAndPriceFilterCol">
        <div flex>
          <div class="filter-title">
            价&emsp;&emsp;格
          </div>
          <div flex="! gap-15px wrap" class="flex-1 w-0">
            <div
              v-for="item in categories?.prices"
              :key="item.min"
              flex="! items-center"
              class="hover:(bg-#3F80E4 text-white) px-10px text-#030718 leading-28px rounded-2px cursor-pointer"
              :class="{
                'bg-#3F80E4 text-white': selectedFilterContextFlat.includes(item.max ? `${item.min}-${item.max}` : `${item.min}以上`),
              }"
              @click="handleSelectedFilterContext(item.max ? `${item.min}-${item.max}` : `${item.min}以上`, 'prices')"
            >
              <template v-if="item.max">
                {{ item.min }}-{{ item.max }}
              </template>
              <template v-else>
                {{ item.min }}以上
              </template>
            </div>
          </div>
        </div>
        <div class="pl-102px box-border mt-24px text-#030718 flex items-center gap-20px">
          自定义区间
          <div>
            <ElInputNumber :controls="false" class="w-92px! h-28px" placeholder="最低价格" />
            -
            <ElInputNumber :controls="false" class="w-92px! h-28px" placeholder="最高价格" />
          </div>
          <div
            class="text-14px text-white bg-#3F80E4 rounded-2px text-center w-60px leading-28px cursor-pointer"
          >
            查询
          </div>
        </div>
      </div>

      <!-- <div class="flex border-0 border-t-1px border-solid border-#D0D4DB pt-23px box-border">
        <div class="text-#3F80E4 flex items-center cursor-pointer">
          时间 <span class="i-tabler:arrow-up text-18px ml-10px" />
        </div>
        <div class="ml-50px cursor-pointer">
          热度
        </div>
      </div> -->
    </div>

    <div
      w="2xl:1400px xl:90% lg:98%"
      class="mt-16px box-border mx-auto pb-20px"
      grid="~ xl:cols-3 lg:cols-2 rows-[282px] auto-rows-[282px] gap-16px"
    >
      <div
        v-for="item in supplyDemandList"
        :key="item.id"
        class="bg-white px-24px py-34px box-border cursor-pointer rounded-2px lg:hover:drop-shadow-2xl"
      >
        <div class="flex pb-10px box-border border-0 border-b-1px border-solid border-gray-200">
          <NuxtImg
            :width="100"
            :height="100"
            :src="item.image"
            placeholder
            class="rounded-2px"
          />
          <div class="ml-20px flex-1 w-0">
            <div class="truncate text-#030718 text-20px">
              {{ item.title }}
            </div>
            <div class="line-clamp-3 text-14px text-gray mt-10px">
              {{ item.description || '-' }}
            </div>
          </div>
        </div>
        <div text="14px gray" mt="15px">
          {{ item.enterpriseName || '-' }}
        </div>
        <div class="flex gap-5px">
          <div
            v-for="tag in item.tags"
            :key="tag"
            class="bg-#3F80E4 bg-opacity-16 text-14px mt-10px px-10px box-border text-#3F80E4 leading-23px rounded-2px"
          >
            {{ tag }}
          </div>
        </div>
        <div class="mt-15px text-#FA6400">
          <span class="mr-5px">¥</span><span text="28px">{{ item.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  border-radius: 0;
}

.category-tab {
  color: #3F80E4;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 201px;
  height: 44px;
  cursor: pointer;
  border: 1px solid #3F80E4;
  user-select: none;

  &_active {
    color: white;
    background: linear-gradient( 90deg, #68A9FD 0%, #3A7BE1 100%);
  }
}

.filter-title {
  color: #030718;
  font-size: 18px;
  margin-right: 26px;
  line-height: 30px;
}
</style>
