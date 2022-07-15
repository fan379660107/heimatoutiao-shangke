import storage from '@/utils/storage'

const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN_KEY)

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)
