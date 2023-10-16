<template>
	<view class="container">
		<view class="container_main  flex-center">
			<image class="logo" src="../../static/images/LOGO.png" mode="widthFix"></image>
			<view class="cinput">
				<view class="txt">
					your phone is {{query.phonenumber}}
				</view>
			</view>
			<view class="cinput">
				<input type="text" v-model="email" placeholder="email">
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
				email: "",
				userName: "",
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
				if (this.email == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.request.getRequest('/api/ma/sysUser/mailCode', {
					email: this.email,
				}).then(res => {
					this.navigatePage('/pages/register2/register2', {
						phonenumber: this.query.phonenumber,
						email: this.email,
					})
				});
			},
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

	.txt {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
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