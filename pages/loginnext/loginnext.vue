<template>
	<view class="container">
		<view class="container_main  flex-center">
			<image class="logo flipInX animated" src="../../static/images/LOGO.png" mode="widthFix"></image>
			<view class="cinput">
				<input type="text" v-model="username" placeholder="userName">
			</view>
			<view class="cinput">
				<input type="password" v-model="password" placeholder="password">
			</view>
		</view>
		<view class="footer" @click="submit()">
			<view>
				<image src="../../static/images/Arrow-47left.png" class="left-img" alt="" mode="widthFix" />
			</view>
			<view class="footer-text">
				Click to continue
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			submit() {
				if (this.username == '' || this.password == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.request.postRequest('/api/ma/sysUser/login', {
					username: this.username,
					password: this.password,
				}).then(res => {
					uni.setStorageSync('token', res.token)
					this.getUserInfoData()
				});
			},
			// 获取用户信息
			getUserInfoData() {
				this.request.getRequest('/api/ma/sysUser/getInfo', {}).then(res => {
					let userInfo = res.user
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					this.switchTabPage('/pages/homepage/homepage')
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		font-size: 25rpx;
		font-weight: bold;
	}

	.logo {
		width: 130px;
	}

	.cinput {
		margin-top: 80rpx;
		width: 500rpx;
		height: 120rpx;
		border-radius: 30rpx;
		background-color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		padding: 30rpx;
		box-sizing: border-box;

		input {
			outline: none;
			background-color: none;
			height: 100%;
			font-size: 36rpx;
		}
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 30rpx 60rpx;
		font-family: Neue Montreal;
		font-size: 24rpx;
		font-weight: 700;
		line-height: 28rpx;
		letter-spacing: 0em;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>