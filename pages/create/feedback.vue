<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="tipmini">Got feedback?</view>
			<image class="evaluate" src="../../static/images/evaluate1.png" mode="widthFix"
				@click="navigatePage('/pages/create/submission')"></image>
			<image class="evaluate" src="../../static/images/evaluate2.png" mode="widthFix"
				@click="navigatePage('/pages/create/submission')"></image>
			<image class="evaluate" src="../../static/images/evaluate3.png" mode="widthFix"
				@click="navigatePage('/pages/create/submission')"></image>
		</view>
		<tabBar index='3'></tabBar>
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
	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 39rpx;
		font-weight: bold;
		overflow: hidden;
		text-align: center;
	}

	.main {
		margin-top: 60rpx;

		image {
			width: 600rpx;
		}
	}

	.evaluate {
		width: 210rpx;
		margin: 30rpx 0;
	}
</style>