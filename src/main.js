import Vue from 'vue'
import App from './pages/example/App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')