<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="tipmini">
				<view class="samlltxt">Your event {{query.eventname}} at the Courthouse has joined the pond!</view>
				<view>You can view or edit this event from your account page.</view>
			</view>
			<view class="main">
				<image :src="query.eventpic" mode="aspectFit"></image>
				<!-- <image src="../../static/images/IMG_70884.png" mode="widthFix" /> -->
			</view>
			<view class="btn" @click="switchTabPage('/pages/homepage/homepage')">
				Share with my network
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
		onLoad() {
			console.log(9, this.query)
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			submit() {
				this.request.getRequest('/api/ma/event/insert', {
					eventname: this.query.title, // 活动名称
					eventpic: this.query.eventpic, // 活动图片
					eventtime: this.query.eventtime, // 活动时间
					eventaddr: this.query.eventaddr, // 活动地址
					xpos: this.query.xpos, // x坐标
					ypos: this.query.ypos, // y坐标
					details: this.query.details, // who
					eventdesc: this.query.eventdesc, // 事件描述
					tabList: this.query.dataStrId.split(',') // 标签
				}).then(res => {
					this.navigatePage('/pages/create/hostDetail')
				});
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
</style>