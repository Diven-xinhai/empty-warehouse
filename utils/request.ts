import { getLocalStore } from './common'

type RequestOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, any>
  body?: Record<string, any>
  errorAlert?: boolean
  baseURL?: string
}

export function request(url: string, options?: RequestOptions) {
  if (options?.params) {
    const params = new URLSearchParams()
    for (const key of Object.keys(options.params)) {
      params.append(key, options.params[key])
    }
    url = `${url}?${params.toString()}`
  }

  const token = getLocalStore('token')

  const { errorAlert = true } = options || {}
  const baseURL = options?.baseURL || import.meta.env.VITE_GLOB_API_URL
  return fetch(`${baseURL}${url}`, {
    ...options,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Hulk-Auth': `bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.error && errorAlert) {
        ElMessage.error({
          message: res.error_description,
          zIndex: 2000,
        })
        return Promise.reject(res.error_description)
      }

      if (res.code === 401) {
        ElMessage.error({
          message: res.msg || '登录过期，请重新登录',
          zIndex: 2000,
        })
        setTimeout(() => {
          location.href = `${location.origin}/?expired`
        }, 2000)
        return
      }

      if (res.code && res.code !== 200 && errorAlert) {
        ElMessage.error({
          message: res.msg,
          zIndex: 2000,
        })
        return Promise.reject(res.msg)
      }

      return res
    })
}
