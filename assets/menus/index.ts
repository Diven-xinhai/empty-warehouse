import type { MenuItem } from './types'
import {
  Lock as IconLock,
  Notification as IconNotification,
  Position as IconPosition,
  User as IconUser,
} from '@element-plus/icons-vue'

export const userInfoMenus: MenuItem[] = [
  {
    key: 'userInfo-1',
    name: '账号信息',
    path: '/manage/userInfo',
    icon: IconUser,
    parentId: null,
    // role: ["enterprise", "service"],
  },
  {
    key: 'userInfo-2',
    name: '修改密码',
    path: '/manage/userInfo/password',
    icon: IconLock,
    parentId: null,
    // role: ["enterprise"],
  },
]

// 供需管理菜单
export const supplyDemandMenus: MenuItem[] = [
  {
    key: 'supplyDemand-1',
    name: '我的需求',
    path: '/manage/supplyDemand/supply',
    icon: IconPosition,
    parentId: null,
    // role: ["enterprise", "service"],
  },
  {
    key: 'supplyDemand-2',
    name: '我的服务',
    path: '/manage/supplyDemand/demand',
    icon: IconNotification,
    parentId: null,
    // role: ["enterprise"],
  },
]
