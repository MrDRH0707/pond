<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				<view>I want to</view>
				<view class="green">create</view>
				<view class="mr_10">an event calledg</view>
				<view class="tipinput">
					<textarea v-model="value" :style="{ width: spanWidth }" :auto-height="true" @input="getValue"
						@keydown.enter="submit()" placeholder="what?" />
					<view class="spanText">{{ spanText }}</view>
				</view>
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
				value: '',
				spanText: '',
				spanWidth: uni.upx2px(160) + 'px'
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {

		},
		methods: {
			getValue(val) {
				this.spanText = val.target.value;
				setTimeout(() => {
					let view = uni.createSelectorQuery().select(".spanText");
					view.boundingClientRect(data => {
						if (data.width > 90) {
							this.spanWidth = uni.upx2px(260) + 'px'
						} else if (data.width < 160) {
							this.spanWidth = uni.upx2px(160) + 'px'
						} else {
							this.spanWidth = data.width + "px";
						}
					}).exec();
				})
			},
			submit() {
				if (this.value == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/create/hostClass', {
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

		.green {
			color: #03A727;
			padding: 0 10rpx;
		}

		.mr_10 {
			margin-right: 10rpx;
		}

		.tipinput {
			max-width: 100%;
			margin-bottom: -14rpx;
			vertical-align: middle;

			textarea {
				max-width: 100%;
				border: none;
				outline: none;
				background-color: transparent;
				box-shadow: none;
				display: inline-block;
				font-size: 50rpx;
				color: #03A727;
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