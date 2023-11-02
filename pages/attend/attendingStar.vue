<template>
	<view>
		<web-view v-if="websrc" :src="websrc" @message="handleMessage"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				websrc: ''
			};
		},
		onShow() {
			this.websrc = ''
			setTimeout(() => {
				this.seturl(Object.assign({
					weburl: '/static/html/attendingStar.html#/',
					unititle: 'attendingStar',
					baseUrl: this.request.baseUrl,
					token: uni.getStorageSync('token'),
					userid: this.userInfo.userId,
				}, this.query))
			}, 500)
		},
		methods: {
			seturl(option) {
				var keys = Object.keys(option)
				var str = ""
				for (var i = 0; i < keys.length; i++) {
					if (keys[i] == "unititle") {
						uni.setNavigationBarTitle({
							title: option[keys[i]]
						})
						continue
					}
					if (keys[i] == "weburl") continue
					str += ("&" + keys[i] + "=" + option[keys[i]])
				}
				this.websrc = option.weburl + "?" + str.slice(1, str.length);
			},
			handleMessage(e) {
				console.log('data：', e.detail.data[0]);
				let msgquery = e.detail.data[0]
				if (msgquery.type == 'navigatePage') {
					this.navigatePage(msgquery.url);
				}
				if (msgquery.type == 'switchTab') {
					this.switchTabPage(msgquery.url);
				}
			},
		}
	}
</script>