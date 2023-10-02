<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="p2_main1">
				Welcome to the
			</view>
			<view class="logo_main">
				<image class="p2_ioc1" src="../../static/images/p2_ioc1.png" mode="widthFix" />
				<image class="logoico" src="../../static/images/LOGO.png" mode="widthFix" />
			</view>
			<view class="btn p2_btn1" @click="navigatePage('/pages/ergister/ergister')">
				<view>This is my</view>
				<view>first time here</view>
			</view>
			<view class="btn p2_btn2" @click="navigatePage('/pages/ergister2/ergister2')">
				<view>l already have</view>
				<view>an account</view>
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

		}
	}
</script>

<style lang="less" scoped>
	.p2_main1 {
		width: 300rpx;
		font-size: 22rpx;
		font-weight: bold;
	}

	.logo_main {
		margin-top: 20rpx;
		position: relative;
		width: 420rpx;

		.p2_ioc1 {
			width: 100%;
		}

		.logoico {
			position: absolute;
			top: 0;
			right: 0;
			width: 50%;
		}
	}

	.btn {
		margin-top: 140rpx;
		width: 500rpx;
		height: 150rpx;
		border-radius: 30rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		font-weight: bold;
	}

	.p2_btn1 {
		margin-top: 140rpx;
	}

	.p2_btn2 {
		margin-top: 80rpx;
	}
</style>