import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import $http from './requests/index'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局的混合
Vue.mixin({
  filters: {
    toFixed2(num) {
      if (num !== undefined) {
        num -= 0
        return num.toFixed(2)
      }
    }
  }
})

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  next()
})

Vue.prototype.$http = $http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
