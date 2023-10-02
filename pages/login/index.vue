<template>
	<view class="container">
		<view class="container_main flex-center" @click="switchTabPage('/pages/homepage/index')">
			<image class="p5_txt1" src="../../static/images/p5_txt1.png" mode="widthFix" />
			<view style="margin-top: 320rpx;">Click anywhere to continue</view>
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
	.container_main {
		font-size: 30rpx;
		font-weight: bold;
	}

	.p5_txt1 {
		width: 130rpx;
	}
</style>