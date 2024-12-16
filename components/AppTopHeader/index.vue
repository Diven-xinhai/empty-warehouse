<script setup lang="ts">
import { ArrowDown, Expand, Fold } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'
import { setLocalStore } from '~/utils/common'

const isCollapse = useIsCollapse()
const name = ref('')

const { userInfo } = useUserInfo()

function handleCollapse() {
  isCollapse.value = !isCollapse.value
}

onMounted(() => {
})

function handleLogout() {
  request('/iot-auth/oauth/logout', {
    headers: {
      Authorization: `Basic ${CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse('falcon:falcon_secret'),
      )}`,
    },
    errorAlert: false,
  }).then(() => {
    userInfo.value = undefined
    setLocalStore({ name: 'token', content: '' })
    setLocalStore({ name: 'userInfo', content: '' })
    setLocalStore({ name: 'tenantId', content: '' })
    sessionStorage.clear()
    const router = useRouter()
    router.replace(`/`)
  })
}
</script>

<template>
  <div
    class="bg-white w-100% h-50px pl-15px pr-15px box-border flex justify-between items-center border-b border-b-solid border-b-#e5e5e5"
  >
    <div class="flex items-center">
      <el-icon size="18px" class="cursor-pointer" @click="handleCollapse">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
      <div class="pl-15px">
        {{ name }}
      </div>
    </div>
    <p v-if="!userInfo" class="el-dropdown-link">
      未登录
    </p>
    <el-dropdown v-else>
      <p class="el-dropdown-link">
        {{ userInfo.nick_name }}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </p>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
