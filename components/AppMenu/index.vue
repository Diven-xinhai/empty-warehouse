<script setup lang="ts">
import type { MenuItem } from '~/assets/menus/types'
import { ElIcon } from 'element-plus'
import Item from './Item.vue'

const { roleMenu } = useRoleMenu()

const route = useRoute()
const router = useRouter()

const isCollapse = useIsCollapse()
const tags = useTags()

function getMenu() {
  return roleMenu.value || []
}

const defaultActive = ref(route.path)

function handleClick(item: MenuItem) {
  if (item.path.includes('http')) {
    window.open(item.path)
  }
  else {
    item.path && router.push(item.path)

    const obj = tags.value.find(tag => tag.key === item.key)

    if (!obj) {
      tags.value.push(item)
      sessionStorage.setItem('tags', JSON.stringify(tags.value))
    }
  }
}

watch(
  () => route.path,
  (newValue) => {
    const obj = findMenuItemByPath(getMenu(), newValue)
    if (obj) {
      defaultActive.value = obj.key
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="border menu-wrap">
    <!-- <div class="h-50px box-border p-10px">
      <img class="w40px h40px m-auto" :src="userInfo?.avatar" alt="" />
    </div> -->
    <el-scrollbar style="height: calc(100vh - 50px)">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical"
        :collapse="isCollapse"
      >
        <template v-for="item in getMenu()" :key="item.key">
          <Item
            v-if="!item.children"
            :item="item"
            @handle-click="handleClick(item)"
          />

          <el-sub-menu v-else :index="item.key">
            <template #title>
              <ElIcon>
                <component :is="item.icon" />
              </ElIcon>
              <span>{{ item.name }}</span>
            </template>

            <Item
              v-for="(child, index) in item.children"
              :key="index"
              :item="child"
              @handle-click="handleClick(child)"
            />
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical {
  height: 100%;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: $menu-width;
}

.menu-wrap {
  border-right: 1px solid var(--el-menu-border-color);
}
.el-menu {
  border-right: 0px;
}
</style>
