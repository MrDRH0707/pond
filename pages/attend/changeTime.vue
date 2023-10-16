<template>
	<view class="container">
		<view class="container_main flex-center">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				I want to<view class="blue">attend</view>an event in
				<view class="blue" @click="historyback()">{{query.title}}</view>
				<view class="gray" v-if="dateStr == '' || dateType == '4'">on</view>
				<view class="blue">{{dateStr}}</view>
			</view>
			<view class="tipmini">
				<view>Select from the options below</view>
			</view>
			<view class="list">
				<view class="item" @click="change('Today', '1')">
					<view>Today</view>
				</view>
				<view class="item" @click="change('Tomorrow', '2')">
					<view>Tomorrow</view>
				</view>
				<view class="item" @click="change('This Weekend', '3')">
					<view>This Weekend</view>
				</view>
			</view>
			<view class="next" @click="ondatatime()">
				create a custom date
			</view>
			<datatime ref="datatime" @change="datatimechange"></datatime>
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
				dateStr: "", //要显示的时间值
				dateType: "",
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			change(str, i) {
				this.dateStr = str;
				this.dateType = i;
			},
			// 选择完整日期
			ondatatime(e) {
				this.$refs.datatime.openpicker(e);
			},
			// 完整日期回调
			datatimechange(row) {
				this.dateStr = row.slice(0, 13)
				this.dateType = '4';
			},
			submit() {
				if (this.dateStr == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/attend/changeOption', {
					title: this.query.title,
					dateStr: this.dateStr,
					dateType: this.dateType
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.tiptxt {
		margin-top: 140rpx;
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

		.gray {
			color: #c0bdb3;
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

	.list {
		display: flex;
		flex-direction: column;
		align-items: center;

		.item {
			margin-top: 50rpx;
			padding: 0 54rpx;
			height: 112rpx;
			border-radius: 20rpx;
			text-align: center;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
			font-weight: bold;
		}
	}

	.next {
		display: inline-block;
		padding: 15rpx 30rpx;
		border-radius: 50rpx;
		background-color: #fff;
		text-align: center;
		font-weight: bold;
		margin: 70rpx auto;
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