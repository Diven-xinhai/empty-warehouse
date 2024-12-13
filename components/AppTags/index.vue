<template>
  <div
    class="tags-box-style bg-#fff h-45px pl-15px pr-15px box-border flex items-center border-b border-b-solid border-b-#e5e5e5"
    :class="isCollapse ? 'tags-box-style-true' : 'tags-box-style-false'"
  >
    <ElScrollbar>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        class="demo-tabs"
        :closable="tags && tags.length > 1"
        @tab-remove="removeTab"
        @tab-click="changeTab"
      >
        <el-tab-pane
          v-for="item in tags"
          :key="item.name"
          :label="item.name"
          :name="item.key"
        >
        </el-tab-pane>
      </el-tabs>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from "element-plus";

const route = useRoute();
const router = useRouter();
const isCollapse = useIsCollapse();
const tags = useTags();
const { userInfo } = useUserInfo();
const editableTabsValue = ref("");
const { roleMenu } = useRoleMenu();
const removeTab = (targetName: TabPaneName) => {
  tags.value = tags.value.filter((tab) => tab.key !== String(targetName));
  if (editableTabsValue.value === String(targetName)) {
    router.push(tags.value[tags.value.length - 1].path!);
  }
  editableTabsValue.value = tags.value[tags.value.length - 1].key;
  sessionStorage.setItem("tags", JSON.stringify(tags.value));
};

function changeTab(pane: TabsPaneContext, ev: Event) {
  const key = pane.paneName;
  const obj = tags.value.find((tag) => tag.key === key);
  if (obj && obj.path) {
    router.push(obj.path);
  }
}

watch(
  () => route.path,
  (newValue) => {
    const obj = findMenuItemByPath(roleMenu.value, newValue);
    if (obj) {
      editableTabsValue.value = obj.key;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  const storTags = sessionStorage.getItem("tags");
  if (storTags) {
    tags.value = JSON.parse(storTags);
  } else {
    tags.value.push(roleMenu.value[0])
    const detail = userInfo.value;
  }
});
</script>

<style lang="scss">
.tags-box-style-false {
  width: calc(100vw - $menu-width);
}
.tags-box-style-true {
  width: calc(100vw - 64px);
}
.demo-tabs {
  height: 40px;
}
.demo-tabs > .el-tabs__content {
  padding: 0;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs > .el-tabs__header {
  margin: 0;
  border: none;
}
.demo-tabs > .el-tabs__header .el-tabs__item {
  color: #ccc;
  border: none !important;
  border-left: none;
}
.demo-tabs > .el-tabs__header .el-tabs__nav {
  border: none !important;
}
.demo-tabs .el-tabs__item.is-active {
  color: #fff;
  background-color: #6397f9;
  border-radius: 5px 5px 0 0;
}

.tags-box-style {
  transition: all 0.3s ease-in-out;
  .el-scrollbar__view {
    margin-top: 3px;
  }
}
</style>
