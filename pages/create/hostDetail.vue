<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="tipmini">
				<view class="samlltxt">Your event {{query.eventname}} at the Courthouse has joined the pond!</view>
				<view>You can view or edit this event from your account page.</view>
			</view>
			<view class="main">
				<image :src="query.eventpic" mode="aspectFill"></image>
				<!-- <image src="../../static/images/IMG_70884.png" mode="widthFix" /> -->
			</view>
			<view class="btn" @click="dialogshow2 = true">
				Share with my network
			</view>
			<view class="more">
				<view @click="navigatePage('/pages/create/feedback',{id:query.id})">Got feedback?</view>
			</view>
			<view class="dialog2" v-if="dialogshow2" @click="dialogshow2 = false">
				<view class="dialog_main_bottom">
					<image src="@/static/images/ShareSheet.png" mode="widthFix" @click="share"></image>
				</view>
			</view>
		</view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	const facebook = uni.requireNativePlugin("sn-facebook");
	export default {
		data() {
			return {
				dialogshow2: false
			}
		},
		onReady() {},
		onLoad() {
			console.log(9, this.query)
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			share() {
				facebook.share({
						type: 0,
						url: "https://m.facebook.com",
						quote: "pond"
					},
					(e) => {
						console.log(e)
					},
				);
			}
		}
	}
</script>

<style lang="less" scoped>
	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
		text-align: center;

		.samlltxt {
			margin-bottom: 30rpx;
			text-align: center;
			font-size: 44rpx;
		}
	}

	.main {
		margin-top: 60rpx;

		image {
			width: 600rpx;
		}
	}

	.btn {
		font-family: Neue Montreal;
		font-size: 30rpx;
		font-weight: 700;
		line-height: 26rpx;
		letter-spacing: 0em;
		text-align: center;
		width: 410rpx;
		height: 78rpx;
		border-radius: 20rpx;
		background-color: #fff;
		line-height: 80rpx;
		margin-top: 200rpx;
	}

	.more {
		margin-top: 1.6rem;
		width: 100%;
		text-align: right;
		padding: 0 1rem;
		box-sizing: border-box;

		view {
			display: inline-block;
			color: #C0BDB3;
			font-size: 0.8rem;
		}
	}

	.dialog2 {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);

		.dialog_main_bottom {
			position: absolute;
			bottom: 0%;
			left: 0%;
			right: 0%;
			margin: auto;
			width: 100%;
			border-radius: 20rpx;
			border: 4rpx solid black;
			background-color: #F5F4F0;
			box-sizing: border-box;
			padding: 30rpx;

			image {
				width: 100%;
			}
		}
	}
</style>