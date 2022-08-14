import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'
import './assets/css/iconfont.css'

//import i18n from './language/index'
//import './language/index'
import api from './api/index'
Vue.prototype.$api = api;
//持久化
import './router/permission'
import './utils/localStorage'
// 图表展示
import * as echarts from 'echarts'
//console.log('echarts-----',echarts)
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false


new Vue({
  router,
 //  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
