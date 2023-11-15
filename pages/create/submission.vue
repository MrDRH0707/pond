<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="tipmini">
				<view>Thanks for</view>
				<view>sharing!</view>
			</view>
			<image class="return" src="../../static/images/return.png" mode="widthFix" @click="historyback(2)"></image>
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
		font-size: 36rpx;
		font-weight: bold;
		overflow: hidden;
		text-align: center;
	}

	.return {
		width: 125rpx
	}

	.evaluate {
		width: 210rpx;
		margin: 30rpx 0;
	}
</style>