<script lang="ts" setup>
// const currentPage = defineModel<number>('currentPage', { required: true })
const props = defineProps<{
  listTotal: number
  listSize: number
}>()
const currentPage = ref(1)
const pages = computed(() => Math.ceil(props.listTotal / props.listSize))
const pageList = computed(() => {
  const result = []
  if (pages.value <= 5) {
    for (let i = 1; i <= pages.value; i++) {
      result.push(i)
    }
  }
  else {
    if (currentPage.value <= 2) {
      for (let i = 1; i <= 5; i++) {
        result.push(i)
      }
    }
    else if (currentPage.value >= pages.value - 1) {
      for (let i = pages.value - 4; i <= pages.value; i++) {
        result.push(i)
      }
    }
    else {
      for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
        result.push(i)
      }
    }
  }
  return result
})
</script>

<template>
  <div flex="~ items-center">
    <div class="cursor-pointer text-#666666 hover:text-#4080f9" @click="currentPage = 1">
      首页
    </div>
    <div mx="10px" flex gap="5px">
      <div v-if="currentPage > 3" w="30px" h="30px" text="center #666" leading="30px">
        ...
      </div>
      <div
        v-for="item in pageList" :key="item"
        w="30px" h="30px" text="center #666" leading="30px" cursor="pointer" class="hover:text-#4080f9"
        :class="currentPage === item ? '!text-#4080f9' : ''"
        @click="currentPage = item"
      >
        {{ item }}
      </div>
      <div v-if="currentPage < pages - 2" w="30px" h="30px" text="center #666" leading="30px">
        ...
      </div>
    </div>
    <div class="cursor-pointer text-#666666 hover:text-#4080f9" @click="currentPage = Math.floor(listTotal / listSize)">
      末页
    </div>
  </div>
</template>
