import Vue from 'vue'
import App from './App.vue'
import * as cv from 'opencv.js'

Vue.prototype.$cv = cv

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
