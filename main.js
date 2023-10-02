import Vue from 'vue'
import App from './App'
//把vuex定义成全局组件
import store from '@/store'
Vue.prototype.$store = store
// uview-ui
import uView from 'uview-ui'
Vue.use(uView)
// mixin
import mixin from "./mixins/mixin.js"
Vue.use(mixin)
// 接口请求
import request from './common/request.js'
Vue.prototype.request = request;
// 工具
import utils from './common/utils.js'
Vue.prototype.utils = utils;
// mimap
import {
	VueJsonp
} from 'vue-jsonp/dist'
Vue.use(VueJsonp)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()