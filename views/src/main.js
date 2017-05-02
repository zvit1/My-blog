// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入组件
import '@/assets/css/public.css'
import Vue from 'vue'
import ElementUI from 'element-ui' // Element UI
import 'element-ui/lib/theme-default/index.css'
import Toasted from 'vue-toasted' // 引入提示组件
import VueResource from 'vue-resource'

// 引入自定义的代码
import router from './router'
import App from './App'

Vue.use(ElementUI)
Vue.use(Toasted, {
  position: 'top-center',
  duration: 1000
})
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
