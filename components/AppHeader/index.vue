<script setup lang="tsx">
import { ArrowDown } from '@element-plus/icons-vue'
import CryptoJS from 'crypto-js'

interface MenuItem {
  name: string
  url: string
  isDir?: boolean
  children?: MenuItem[]
}
const menus = ref<MenuItem[]>([
  {
    name: '首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页',
    url: '/',
  },
  {
    name: '政策资讯',
    url: '/1',
  },
  {
    name: '供需对接',
    url: '/2',
  },
  {
    name: '成果发布',
    url: '/3',
  },
])



const route = useRoute()
// 跳转子菜单页面时，关闭子菜单列表
const router = useRouter()
function toPage(url: string) {
  if (/^https?:\/\//.test(url)) {
    return window.open(url, url)
  }

  router.push(url)
}
// --- mobole logic ---
const openMenu = ref(false)
const expandMenuURL = ref('')

function RenderMobileMenu({
  menus,
  index = 1,
}: {
  menus: MenuItem[]
  index?: number
}) {
  return (
    <div>
      {menus.map((item) => {
        return (
          <>
            <div
              style={`padding-left: ${index * 20}px; color: ${
                item.url === route.path ? '#518ffa' : 'black'
              }`}
              class="
            leading-40px text-14px pr-20px box-border border-0 border-b-1px border-solid border-#dcdfe6
            flex items-center justify-between
          "
            >
              <div v-html={item.name}></div>
              {item.children && <div class="i-tabler:chevron-right"></div>}
            </div>
            {item.children && (
              <div
                class={
                  expandMenuURL.value.startsWith(item.url) ? 'block' : 'hidden'
                }
              >
                {RenderMobileMenu({ menus: item.children, index: index + 1 })}
              </div>
            )}
          </>
        )
      })}
    </div>
  )
}

// --- login logic ---
const userInfo = ref<{
  nick_name: string
  access_token: string
  tenant_id: string
}>()

onMounted(() => {
  userInfo.value = getLocalStore('userInfo')
})
function handleLogout() {
  request("/hulk-auth/oauth/logout", {
    headers: {
      Authorization: `Basic ${CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse("falcon:falcon_secret")
      )}`,
    },
    errorAlert: false,
  }).finally(() => {
    userInfo.value = undefined;
    setLocalStore({ name: "token", content: "" });
    setLocalStore({ name: "userInfo", content: "" });
    setLocalStore({ name: "tenantId", content: "" });
  });
}

function handleCommand(command: string) {
  switch (command) {
    case '1':
      toPage('/manage/account')
      break
    case '2':
      handleLogout()
      break
  }
}
</script>

<template>
  <div
    fixed
    left="0"
    top="0"
    h="70px"
    pl="20px"
    box-border
    z="999"
    w-full
    flex="~ items-center justify-between"
    class="group bg-#649AF6 !lg:flex !hidden"
  >
    <div w="25%" class="color-#fff font-bold text-16px" @click="$router.push('/')">
      济南市都市圈产业协作创新发展公共服务平台
    </div>
    <div w="50%" max-w="500px" flex>
      <div v-for="item in menus" :key="item.url" w-full flex="1" class="menu">
        <div
          text="16px center"
          h-full
          select="none"
          leading="70px"
          cursor-pointer
          border="0 solid #fff"
          box-border
          class="hover:border-b-4px text-#fff mx-15px"
          :class="$route.path.startsWith(item.url === '/' ? '_' : item.url)
            || $route.path === item.url
            ? 'border-b-4px'
            : ''"
          @click="!item.isDir && toPage(item.url)"
          v-html="item.name"
        />
      </div>
    </div>
    <div min-w="25%" class="flex items-center justify-end h-60px text-#fff">
      <div
        px="10px"
        mr="30px"
        class="h-full flex-1 flex items-center justify-end relative text-14px"
      >
        <div class="flex items-center mr-30px">
          <div class="mr-10px">
            济南
          </div>
          <div class=" cursor-pointer">
            [切换城市]
          </div>
        </div>
        
        <div
          v-if="!userInfo"
          cursor-pointer
          class="flex items-center justify-center"
          @click="toPage('/manage/login')"
        >
          登录/注册
        </div>
        <el-dropdown v-else placement="top-end"  @command="handleCommand">
          <span class="el-dropdown-link color-#fff">
            {{ userInfo?.nick_name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">账号中心</el-dropdown-item>
              <el-dropdown-item command="2">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

  <!-- mobile menu -->
  <div
    fixed
    left="0"
    top="0"
    w-full
    z-1000
    flex="~ justify-between items-center"
    h="70px"
    px="20px"
    box-border
    class="lg:hidden block bg-#0070ff"
  >
    <div class="color-#fff w-70%">
      济南市都市圈产业协作创新发展公共服务平台
    </div>
    <div flex="~ items-center" text="white 14px">
      <div v-if="userInfo" flex="~ gap-10px" mr="20px">
        <div>Hey, {{ userInfo.nick_name }}</div>
        <div cursor-pointer @click="handleLogout">
          退出登录
        </div>
      </div>
      <div
        v-else
        cursor-pointer
        mr="20px"
      >
        登录/注册
      </div>

      <div
        class="i-tabler:menu-2"
        text="white 25px"
        @click="openMenu = true"
      />
    </div>
  </div>

  <div
    fixed
    top="0"
    bottom="0"
    w-full
    z-1001
    bg="white"
    transition="left"
    class="lg:hidden block"
    :class="openMenu ? 'left-0' : '-left-100%'"
  >
    <div h="70px" px="20px" box-border flex="~ items-center justify-between">
      <div>
        济南市都市圈产业协作创新发展公共服务平台
      </div>
      <div class="i-tabler:x text-25px" @click="openMenu = false" />
    </div>
    <div px="20px" box-border>
      <RenderMobileMenu :menus="menus" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>