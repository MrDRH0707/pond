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
				} else {
					let pages = getCurrentPages();
					let whitelist = ['/pages/intro/intro', '/pages/entry/entry', '/pages/ergister/ergister',
						'/pages/ergister2/ergister2', '/pages/loginnext/loginnext',
						'/pages/register/register', '/pages/register2/register2', '/pages/loginfb/loginfb'
					]
					if (whitelist.indexOf(pages[pages.length - 1].$page.path) == -1) {
						uni.reLaunch({
							url: '/pages/intro/intro'
						})
					}
				}
			},
			methods: {
				getUserInfo() {
					this.request.getRequest('/api/ma/sysUser/getInfo', {}).then(res => {
						this.userInfo = res.user
						uni.setStorageSync('userInfo', JSON.stringify(res.user))
					});
				},
				/**
				 * @param {String} url  
				 * @param {Object} params  
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
						url,
						animationType: 'fade-in',
						animationDuration: 500
					})
				},
				/**
				 * @param {String} url  
				 * @param {Object} params  
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
						url,
					})
				},
				historyback(delta = 1) {
					uni.navigateBack({
						delta,
					})
				},
				nullstr(data) {
					for (let x in data) {
						if (data[x] === null) {
							data[x] = "";
						} else {
							if (Array.isArray(data[x])) {
								data[x] = data[x].map((z) => {
									return this.nullstr(z);
								});
							}
							if (typeof data[x] === "object") {
								data[x] = this.nullstr(data[x]);
							}
						}
					}
					return data;
				},
				setCache(row) {
					let cache = JSON.parse(uni.getStorageSync('cache'))
					let s = Object.assign(cache, row)
					uni.setStorageSync('cache', JSON.stringify(s))
				},
				getCache() {
					let cache = JSON.parse(uni.getStorageSync('cache'))
					return cache
				},
				resetCache() {
					uni.removeStorageSync('cache')
					uni.setStorageSync('cache', '{}')
				}
			}
		})
	}
}