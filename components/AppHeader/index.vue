<script setup lang="tsx">
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
    name: '揭榜挂帅',
    url: '/3',
  },
  {
    name: '基础设施',
    url: '/4',
  },
  {
    name: '公共服务',
    url: '/5',
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
function handleLogout() {
  // request("/iot-auth/oauth/logout", {
  //   headers: {
  //     Authorization: `Basic ${CryptoJS.enc.Base64.stringify(
  //       CryptoJS.enc.Utf8.parse("falcon:falcon_secret")
  //     )}`,
  //   },
  //   errorAlert: false,
  // }).finally(() => {
  //   userInfo.value = undefined;
  //   setLocalStore({ name: "token", content: "" });
  //   setLocalStore({ name: "userInfo", content: "" });
  //   setLocalStore({ name: "tenantId", content: "" });
  //   sessionStorage.clear();
  // });
}
</script>

<template>
  <div
    fixed
    left="0"
    top="0"
    h="60px"
    pl="20px"
    box-border
    z="999"
    w-full
    flex="~ items-center justify-between"
    class="group bg-white bg-transparent !lg:flex !hidden"
  >
    <div w="15%" @click="$router.push('/')">
      <NuxtImg
        src="images/common/logo.png"
        w="full"
        class="light-logo"
      />
    </div>
    <div w="55%" flex>
      <div v-for="item in menus" :key="item.url" w-full flex="1" class="menu">
        <div
          text="14px center"
          h-full
          select="none"
          leading="60px"
          cursor-pointer
          border="0 solid #518ffa"
          box-border
          :class="
            $route.path.startsWith(item.url === '/' ? '_' : item.url)
              || $route.path === item.url
              ? 'border-b-4px text-#518ffa'
              : ''
          "
          @click="!item.isDir && toPage(item.url)"
          v-html="item.name"
        />
      </div>
    </div>
    <div min-w="10%" class="flex items-center justify-center h-60px text-white">
      <div
        px="10px"
        mr="30px"
        class="bg-#00BEFF h-full flex-1 flex items-center justify-center relative"
      >
        <div
          cursor-pointer
          class="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0"
        >
          登录
        </div>
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
    h="60px"
    px="20px"
    box-border
    class="lg:hidden block bg-#0070ff"
  >
    <NuxtImg src="images/common/logo2.png" @click="$router.push('/')" />
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
        Hey, 登录
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
    <div h="60px" px="20px" box-border flex="~ items-center justify-between">
      <NuxtImg
        src="images/common/logo.png"
        w="150px"
        @click="$router.push('/')"
      />
      <div class="i-tabler:x text-25px" @click="openMenu = false" />
    </div>
    <div px="20px" box-border>
      <RenderMobileMenu :menus="menus" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.light {
  background: #fff;

  .light-logo {
    display: block;
  }

  .menu {
    color: #34324d;
  }
}
</style>
