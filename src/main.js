import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 flexble
import 'amfe-flexible/index.min.js'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
