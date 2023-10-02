<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				<view>I want to</view>
				<view class="blue">attend</view>an event in<view class="mr_10"></view>
				<view class="tipinput">
					<textarea v-model="value" :auto-height="true" @keydown.enter="submit()" placeholder="what?" />
				</view>
			</view>
			<view class="tipmini">
				<view>Search for any place using neighbourhood, city, state or ZIP code</view>
			</view>
		</view>
		<view class="footer" @click="submit()">
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
				if (this.value == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/changeTime/index', {
					title: this.value
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
		line-height: 66rpx;
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

		.mr_10 {
			margin-right: 10rpx;
		}

		.tipinput {
			max-width: 100%;
			vertical-align: middle;

			textarea {
				max-width: 100%;
				border: none;
				outline: none;
				background-color: transparent;
				box-shadow: none;
				display: inline-block;
				font-size: 50rpx;
				color: #237bff;
				line-height: 66rpx;
			}

			.spanText {
				font-size: 50rpx;
				position: absolute;
				left: 0;
				padding: 0 15px;
				white-space: nowrap;
				visibility: hidden;
			}
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