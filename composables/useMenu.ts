import { userInfoMenus, supplyDemandMenus } from "@/assets/menus/index";
export const useIsCollapse = () => {
  return useState<boolean>("isCollapse", () => false);
};
interface MenuItem {
  key: string;
  name: string;
  path: string;
  icon: string | Component;
  parentId: string | null;
  children?: MenuItem[];
  role?: string[];
}

export function useRoleMenu() {
  let roleMenu = shallowRef<MenuItem[]>();
  const { userInfo } = useUserInfo();
  const detail = userInfo.value;

  // 测试
  if (true) {
    roleMenu.value = userInfoMenus;
  } else {
    roleMenu.value = supplyDemandMenus;
  }

  return {
    roleMenu,
  };
}
