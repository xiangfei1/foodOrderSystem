import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import 'nm/bootstrap/dist/css/bootstrap.css'
import 'nm/layui-src/src/css/layui.css'
import 'nm/layui-src/src/layui.js'
import elementUI from 'element-ui'  //导入 elementui
import 'nm/element-ui/lib/theme-chalk/index.css'  // 使用 elementui 的样式
// import vuex from 'vuex'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(elementUI)
// Vue.use(vuex)
Vue.filter('dateFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
