import Vue from 'vue'
import DepartmentTree from './index.vue'

const VueChoiceCom = {
	install: function(Vue, options = {}) {
		console.log(options, 'options 测试')
		Vue.prototype.$config = options
		if (typeof window != 'undefined' && window.Vue) {
			console.log(window.Vue)
			Vue = window.Vue
		}
		Vue.component('VueChoiceCom', DepartmentTree)
	}
}

export default VueChoiceCom
