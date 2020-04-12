import Vue from 'vue'
import App from './App.vue'
import * as cv from 'opencv.js'
import './plugins/element.js'
import './assets/theme/index.css';
import './assets/style.css'

document.getElementById("loading").remove()


Vue.prototype.$cv = cv
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
