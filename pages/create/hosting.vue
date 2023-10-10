<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				<view>I want to</view>
				<view class="green">create</view>
				<view class="mr_10">an event calledg</view>
				<view class="tipinput" :style="{ width: spanWidth }">
					<textarea v-model="value" :style="{ width: spanWidth }" :auto-height="true" @input="getValue"
						@keydown.enter="submit()" placeholder="what?" />
					<view class="spanText">{{ spanText }}</view>
				</view>
			</view>
			<view class="dialog" v-if="dialogshow">
				<view class="dialog_main">
					<view class="section">
						This is the creator portal, where you can customise your event listing using location, date, and lots more.
					</view>
					<view class="section">
						If you want to edit any part of this search, click the green text and you will be taken back to that section.
					</view>
					<view class="section">
						Click the POND icon if you want to go back to the homepage.
					</view>
					<view class="dialog_footer">
						<image src="../../static/images/Arrow-47left.png" @click="dialogshow = false" class="left-img"
							mode="widthFix" />
					</view>
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
				spanWidth: uni.upx2px(160) + 'px',
				dialogshow: true
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
						console.log(123, data.width)
						this.spanWidth = data.width + "px";
						if (data.width < 80) {
							this.spanWidth = 80 + 'px'
						} else {
							this.spanWidth = "100%";
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

	.dialog {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.5);

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
			padding: 50rpx 80rpx;

			.section {
				font-family: Neue Montreal;
				font-size: 24rpx;
				font-weight: 700;
				line-height: 36rpx;
				letter-spacing: 0em;
				text-align: left;
				margin-bottom: 30rpx;
			}
		}

		.dialog_footer {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin: 30rpx 0;
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