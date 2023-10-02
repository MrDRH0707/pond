<template>
	<view class="container">
		<view class="container_main">
			<view class="tiptxt">
				I want to<view class="green" @click="historyback(3)">create</view>an event called<view class="green"
					@click="historyback(2)">{{ query.title }}</view>
				with<view class="green" @click="historyback(1)">{{query.dataStr}}</view>
			</view>
			<view class="tipmini">
				<view>Click on any green text to edit your prompt</view>
			</view>
		</view>
		<view class="footer"
			@click="navigatePage('/pages/hostPage/index',{ title: query.title,dataStr:query.dataStr,dataStrId:query.dataStrId })">
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

			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.tiptxt {
		margin: 40rpx auto 0;
		width: 660rpx;
		font-family: Neue Montreal;
		font-size: 50rpx;
		font-weight: 700;
		line-height: 60rpx;
		letter-spacing: 0em;
		text-align: left;
		vertical-align: bottom;
		overflow: hidden;

		view {
			display: inline-block;
		}

		.green {
			color: #03A727;
			padding: 0 10rpx;
		}

		.silver {
			color: #C0BDB3;
			padding: 0 10rpx;
		}

		.tipinput {
			padding-top: 25rpx;
			box-sizing: border-box;
			border: none;
			outline: none;
			background-color: transparent;
			box-shadow: none;
			display: inline-block;
			width: 200rpx;
			font-size: 50rpx;
			height: 60rpx;
			color: #03A727;
		}
	}

	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
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