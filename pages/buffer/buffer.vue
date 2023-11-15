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