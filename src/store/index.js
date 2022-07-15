import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    user: getToken() || {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    }
  }
})
