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
        <template v-for="item in getMenu()" :index="item.key">
          <Item
            v-if="!item.children"
            :item="item"
            @handleClick="handleClick(item)"
          ></Item>

          <el-sub-menu v-else :index="item.key">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <Item
              v-for="(child, index) in item.children"
              :key="index"
              :item="child"
              @handleClick="handleClick(child)"
            ></Item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";

const { roleMenu } = useRoleMenu();
import type { MenuItem } from "~/assets/menus/types";
import Item from "./Item.vue";

const route = useRoute();
const router = useRouter();

const isCollapse = useIsCollapse();
const tags = useTags();
const { userInfo } = useUserInfo();

const getMenu = () => {
  return roleMenu.value;
};

const defaultActive = ref(route.path);

function handleClick(item: MenuItem) {
  if (item.path.includes("http")) {
    window.open(item.path);
  } else {
    item.path && router.push(item.path);
    console.log('-----',tags.value);
    
    const obj = tags.value.find((tag) => tag.key === item.key);
    console.log('bbbbb',obj);
    
    if (!obj) {
      tags.value.push(item);
      sessionStorage.setItem("tags", JSON.stringify(tags.value));
    }
  }
}

watch(
  () => route.path,
  (newValue) => {
    console.log('aaaaaaa',getMenu());
    
    const obj = findMenuItemByPath(getMenu(), newValue);
    if (obj) {
      defaultActive.value = obj.key;
    }
  },
  { immediate: true, deep: true }
);
</script>

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
