interface ImportMetaEnv {
  VITE_GLOB_API_URL: string
}

interface PageResponse<T> {
  current: number
  size: number
  total: number
  records: T[]
}
