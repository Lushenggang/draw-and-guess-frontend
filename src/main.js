import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { CWebSocket } from '@/socket/socket'

Vue.config.productionTip = false
Vue.prototype.$socket = new CWebSocket()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
