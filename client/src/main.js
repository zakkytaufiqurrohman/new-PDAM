import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Axios from 'axios'

Vue.config.productionTip = false

//setting base url for axios
Axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.use(ArgonDashboard)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
