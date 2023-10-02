<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				I want to<view class="blue">attend</view>an event in
				<view class="blue">{{query.title}}</view>on
				<view class="blue">{{query.dateStr}}</view>with
				<view class="blue">{{query.dataStr}}</view>
			</view>
		</view>
		<view class="footer"
			@click="navigatePage('/pages/attendingStar/index',{ title: query.title,dateStr: query.dateStr,dataStr: query.dataStr,dataStrId: query.dataStrId,dateType: query.dateType })">
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
		methods: {}
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