<script lang="ts" setup>
import type { MenuItem } from '~/assets/menus/types'

defineProps<{ item: MenuItem }>()

const emit = defineEmits(['handleClick'])

function handleClick(item: MenuItem) {
  emit('handleClick', item)
}
</script>

<template>
  <el-menu-item
    v-if="!item.children"
    :index="item.key"
    @click="handleClick(item)"
  >
    <el-icon>
      <component :is="item.icon" />
    </el-icon>
    <template #title>
      {{ item.name }}
    </template>
  </el-menu-item>
</template>
