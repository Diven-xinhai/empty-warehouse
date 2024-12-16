import { supplyDemandMenus, userInfoMenus } from '@/assets/menus/index'

export function useIsCollapse() {
  return useState<boolean>('isCollapse', () => false)
}
interface MenuItem {
  key: string
  name: string
  path: string
  icon: string | Component
  parentId: string | null
  children?: MenuItem[]
  role?: string[]
}

export function useRoleMenu() {
  const roleMenu = shallowRef<MenuItem[]>()

  // 测试
  if (true) {
    roleMenu.value = userInfoMenus
  }
  else {
    roleMenu.value = supplyDemandMenus
  }

  return {
    roleMenu,
  }
}
