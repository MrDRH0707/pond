<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="p6_main1">
				I want to...
			</view>
			<view class="btn flex-center" @click="navigatePage('/pages/hosting/index')" style="margin-top: 60px;">
				create
			</view>
			<view class="btn flex-center" @click="navigatePage('/pages/attending/index')" style="margin-top: 30px;">
				attend
			</view>
			<view class="btn flex-center" @click="navigatePage('/pages/browse/index')" style="margin-top: 30px;">
				browse
			</view>
			<view class="dialog" v-if="dialogshow">
				<view class="dialog_main">
					<view class="size top">
						Welcome to your homepage!
					</view>
					<view class="size top">
						Here, you'll have the option to
					</view>
					<view class="size top">
						<view class="list">
							<view>Create new events</view>
							<view>Attend events</view>
							<view>Browse events via maps and your network</view>
							<view>Access your account profile</view>
							<view>Access your starred events as well as the events you've created</view>
						</view>
					</view>
					<view class="footer">
						<image src="../../static/images/Arrow-47left.png" @click="dialogshow = false" class="left-img"
							mode="widthFix" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dialogshow: true
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

	.p6_main1 {
		width: 560rpx;
	}

	.btn {
		width: 400rpx;
		height: 200rpx;
		background-color: #fff;
		border-radius: 40rpx;
	}

	.size {
		font-family: Neue Montreal;
		font-size: 24rpx;
		font-weight: 700;
		line-height: 36rpx;
		letter-spacing: 0em;
		text-align: left;
	}

	.top {
		margin-top: 20rpx;
	}

	.list {
		line-height: 40rpx;
		margin-left: 50rpx;

		view {

			&::before {
				content: '';
				display: inline-block;
				width: 12rpx;
				height: 12rpx;
				border-radius: 12rpx;
				background-color: #2c3e50;
				margin-right: 26rpx;
			}
		}
	}



	.left-img {
		width: 100rpx;
		height: 100rpx;
	}

	.footer {
		text-align: right;
		margin-top: 40rpx;
	}

	.dialog {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);

		.dialog_main {
			position: absolute;
			top: 0%;
			bottom: 0%;
			left: 0%;
			right: 0%;
			margin: auto;
			width: 600rpx;
			height: 700rpx;
			border-radius: 20rpx;
			border: 4rpx solid black;
			background-color: #F5F4F0;
			box-sizing: border-box;
			padding: 30rpx;
		}
	}
</style>