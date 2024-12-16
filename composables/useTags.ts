import type { MenuItem } from '~/assets/menus/types'

export interface Tags extends MenuItem {}

export function useTags() {
  return useState<Tags[]>('tags', () => [])
}
