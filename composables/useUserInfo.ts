export function useUserInfo() {
  const userInfo = ref<{
    nick_name: string
    access_token: string
    tenant_id: string
    avatar: string
    enterprise_id: string | number
  }>()

  onMounted(() => {
    const user = localStorage.getItem('falcon-userInfo')
    // const token = Cookies.get("saber-access-token");
    const token = getLocalStore('token')
    if (user && token) {
      try {
        userInfo.value = JSON.parse(user).content
      }
      catch {}
    }
  })

  return {
    userInfo,
  }
}
