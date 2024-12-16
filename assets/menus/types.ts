import type { Component } from 'vue'

export interface MenuItem {
  key: string
  name: string
  path: string
  icon: string | Component
  parentId: string | null
  children?: MenuItem[]
  role?: string[]
}
