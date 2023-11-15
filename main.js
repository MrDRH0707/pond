import Vue from 'vue'
import App from './App'
import store from '@/store'
Vue.prototype.$store = store
import uView from 'uview-ui'
Vue.use(uView)
import mixin from "./mixins/mixin.js"
Vue.use(mixin)
import request from './common/request.js'
Vue.prototype.request = request;
import utils from './common/utils.js'
Vue.prototype.utils = utils;
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