<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				I want to<view class="blue">attend</view>an event in
				<view class="blue" @click="historyback(3)">{{query.title}}</view>on
				<view class="blue" @click="historyback(2)">{{query.dateStr}}</view>with
				<view class="blue" @click="historyback()">{{query.dataStr}}</view>
			</view>
			<view class="tipmini">
				<view>Click on any blue text to edit your prompt</view>
			</view>
		</view>
		<view class="footer" @click="submit()">
			<view>
				<image src="../../static/images/Logo6.png" class="left-img" alt="" mode="widthFix" />
			</view>
			<view class="footer-text">
				Click to enter the POND
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
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
				this.navigatePage('/pages/buffer/buffer', {
					pageurl: '/pages/attend/attendingStar',
					title: this.query.title,
					dateStr: this.query.dateStr,
					dataStr: this.query.dataStr,
					dataStrId: this.query.dataStrId,
					dateType: this.query.dateType
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tiptxt {
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

		.blue {
			color: #237bff;
			padding: 0 10rpx;
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