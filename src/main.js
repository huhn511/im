import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('formatTimestampToDate', function (timestamp) {
  if (timestamp) {
    return moment(timestamp * 1000).format('HH:mm, Do MMMM')
  }
})  

new Vue({
  render: h => h(App),
}).$mount('#app')
