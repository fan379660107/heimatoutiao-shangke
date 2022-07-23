import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getNews, setNews } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    user: getToken() || {},
    news: getNews() || {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    },
    setNews(state, payload) {
      state.news = payload
      setNews(payload)
    }
  }
})
