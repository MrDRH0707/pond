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
		onLoad() {
			this.seturl(Object.assign({
				weburl: '/static/html/selarea.html#/',
				unititle: 'selarea',
				baseUrl: this.request.baseUrl,
				token: uni.getStorageSync('token'),
				userid: this.userInfo.userId,
			}, this.query))
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
				console.log('接收到的消息：', e.detail.data[0]);
				let msgquery = e.detail.data[0]
				if (msgquery.type == 'historyback') {
					this.historyback();
				}
			},
		}
	}
</script>