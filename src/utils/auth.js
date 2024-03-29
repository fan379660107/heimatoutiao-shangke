import storage from '@/utils/storage'
// token
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

const NEWS_KEY = 'HEIMA_TOUTIAO_NEWS'

export const getNews = () => storage.get(NEWS_KEY)
export const setNews = (token) => storage.set(NEWS_KEY, token)
