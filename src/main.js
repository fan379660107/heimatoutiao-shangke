import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'github-markdown-css/github-markdown.css'
import '@/assets/fonts/iconfont.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 flexble
import 'amfe-flexible/index.min.js'
// 引入 markdown
import mavonEditor from 'mavon-editor'
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
