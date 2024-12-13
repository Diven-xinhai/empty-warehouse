import type { MenuItem } from "~/assets/menus/types";

export function setLocalStore(params: { name: string; content: string }) {
  let { name, content } = params;
  /**
   * falcon 必须和 “青鸟翼联” 保持一致
   */
  name = `falcon-${name}`;
  let obj = {
    dataType: typeof content,
    content: content,
    datetime: new Date().getTime(),
  };
  window.localStorage.setItem(name, JSON.stringify(obj));
}

export function getLocalStore(key: string) {
  key = `falcon-${key}`;
  const value = window.localStorage.getItem(key);

  try {
    if (!value) {
      return null;
    }

    return JSON.parse(value).content;
  } catch {
    return null;
  }
}

/** 递归查找菜单项 */
export function findMenuItemByPath(
  menus: MenuItem[],
  path: string
): MenuItem | null {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu; // 找到匹配的key，返回菜单项
    }
    if (menu.children) {
      const found = findMenuItemByPath(menu.children, path);
      if (found) return found; // 在子菜单中找到匹配的key，返回菜单项
    }
  }
  return null; // 如果没有找到，返回null
}
