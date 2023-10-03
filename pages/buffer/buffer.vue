<template>
	<view class="container">
		<view class="container_main  flex-center" @click="navigatePage(query.pageurl,query)">
			<image class="logo" src="../../static/images/LOGO.png" mode="widthFix"></image>
			<view class="txt"></view>
			<view class="tipmini">
				<view>Click anywhere to continue</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			getlogin() {
				this.navigatePage('/pages/entry/entry');
				// uni.login({
				// 	provider: 'facebook',
				// 	success: function(loginRes) {
				// 		console.log('你倒是登录进来呀', loginRes)
				// 		// 登录成功
				// 		uni.getUserInfo({
				// 			provider: 'facebook',
				// 			success: function(info) {
				// 				// 获取用户信息成功, info.authResult保存用户信息
				// 			}
				// 		})
				// 	},
				// 	fail: function(err) {
				// 		// 登录授权失败  
				// 		// err.code是错误码
				// 	}
				// });
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo {
		width: 150px;
	}

	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
		text-align: center;
	}
</style>