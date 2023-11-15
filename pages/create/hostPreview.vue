<template>
	<view class="container">
		<view class="pagerocker">
			<image src="../../static/images/return.png" mode="widthFix" @click="historyback()"></image>
		</view>
		<view class="container_main flex-center">
			<view class="tipmini">
				<view>This is what your event preview will look like from the attending portal.</view>
				<view>Are you ready to get your event out there?</view>
			</view>
			<view class="main">
				<view class="box">
					<image :src="query.eventpic" mode="aspectFill"></image>
					<!-- <view class="info">
						<view class="infol">{{query.dataStr}}</view>
						<view class="infor">{{query.eventaddr}} {{query.eventtime}}</view>
					</view> -->
					<view class="item_info">
						<view class="_info1">
							<view>{{ query.title }}</view>
							<view>{{ query.dataStr }}</view>
						</view>
						<view class="_info2">{{ query.eventaddr }} {{ query.eventtime }}</view>
					</view>
				</view>
				<!-- <image src="../../static/images/Eventlisting.png" class="left-img" alt="" mode="widthFix" /> -->
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
				this.request.postRequest('/api/ma/event/insert', {
					eventname: this.query.title,
					eventpic: this.query.eventpic,
					eventtime: this.query.eventtime,
					eventaddr: this.query.eventaddr,
					xpos: this.query.xpos,
					ypos: this.query.ypos,
					details: this.query.details,
					eventdesc: this.query.eventdesc,
					tabList: this.query.dataStrId.split(',')
				}).then(res => {
					// this.navigatePage('/pages/create/hostDetail', {
					// 	eventname: this.query.title,
					// 	eventpic: this.query.eventpic,
					// })
					this.navigatePage('/pages/buffer/buffer', {
						id: res.data.id,
						pageurl: '/pages/create/hostDetail',
						eventname: this.query.title,
						eventpic: this.query.eventpic,
					})
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.tipmini {
		margin: 0 auto;
		width: 660rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
	}

	.main {
		margin-top: 60rpx;

		.box {
			width: 450rpx;
			height: 360rpx;
			border: 1px solid black;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 12rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			image {
				width: 400rpx;
				height: 200rpx;
			}

			// .info {
			// 	display: flex;
			// }

			.item_info {
				flex: 1;
				margin-top: 10rpx;
				display: flex;
				overflow: hidden;

				._info1 {
					flex: 1;
					font-size: 22rpx;
					font-weight: bold;
				}

				._info2 {
					flex: 1;
					font-size: 24rpx;
					overflow: auto;
				}
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
			width: 150rpx;
			height: 100rpx;
		}
	}
</style>