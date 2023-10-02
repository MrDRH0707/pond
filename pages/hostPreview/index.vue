<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="tipmini">
				<view>This is what your event preview will look like from the attending portal.</view>
				<view>Are you ready to get your event out there?</view>
			</view>
			<view class="main">
				<image src="../../static/images/Eventlisting.png" class="left-img" alt="" mode="widthFix" />
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
					this.navigatePage('/pages/hostDetail/index')
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
	}

	.main {
		margin-top: 60rpx;

		image {
			width: 400rpx;
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
			width: 150rpx;
			height: 100rpx;
		}
	}
</style>