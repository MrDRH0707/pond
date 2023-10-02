var app;
export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					query: {},
					userInfo: null,
				}
			},
			onLoad(options) {
				this.query = options;
				let u_info = uni.getStorageSync('userInfo')
				if (u_info) {
					this.userInfo = JSON.parse(u_info)
				}
			},
			methods: {
				/**
				 * 页面跳转
				 * @param {String} url  跳转地址
				 * @param {Object} params  跳转参数
				 */
				navigatePage(url, params = {}) {
					let query = [];
					for (var p in params) {
						if (params.hasOwnProperty(p)) {
							query.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
						}
					}
					if (query.length) {
						url = `${url}?${query.join('&')}`;
					}
					uni.navigateTo({
						url
					})
				},
				/**
				 * 页面跳转
				 * @param {String} url  跳转地址
				 * @param {Object} params  跳转参数
				 */
				switchTabPage(url, params = {}) {
					let query = [];
					for (var p in params) {
						if (params.hasOwnProperty(p)) {
							query.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
						}
					}
					if (query.length) {
						url = `${url}?${query.join('&')}`;
					}
					uni.switchTab({
						url
					})
				},
				/**
				 * 返回上一层
				 */
				historyback(delta = 1) {
					uni.navigateBack({
						delta
					})
				},
				/**
				 * 处理json数据空值置空
				 */
				nullstr(data) {
					for (let x in data) {
						if (data[x] === null) {
							data[x] = "";
						} else {
							if (Array.isArray(data[x])) {
								// 是数组遍历数组 递归继续处理
								data[x] = data[x].map((z) => {
									return this.nullstr(z);
								});
							}
							if (typeof data[x] === "object") {
								// 是json 递归继续处理
								data[x] = this.nullstr(data[x]);
							}
						}
					}
					return data;
				},
			}
		})
	}
}