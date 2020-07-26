import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import Axios from 'axios'
//setting base url for axios
Axios.defaults.baseURL = process.env.VUE_APP_API_URL
let token = localStorage.getItem('access_token') 
Axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`
Vue.use(ArgonDashboard)
Vue.filter('currency', (money) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(money)
})
Vue.config.productionTip = false
new Vue({
  store,
  axios: Axios,
  router,
  render: h => h(App)
}).$mount('#app')
