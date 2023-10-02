<template>
	<view class="container">
		<view class="container_main">
			<view class="tipmini">
				<view class="samlltxt">Your Starred Events</view>
			</view>
			<view class="tag">
				<view class="item" :class="{ 'active': tags == 1 }" @click.stop="tags = 1">By date</view>
				<view class="item" :class="{ 'active': tags == 2 }" @click.stop="tags = 2">By location</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in list"
					@click="navigatePage('/pages/eventdetail/index',{id:item.id})">
					<image :src="item.eventpic" alt="" mode="aspectFit" />
					<view class="item_info">
						<view class="_info1">
							<view>{{ item.eventname }}</view>
							<view>{{ item.eventaddr }}</view>
						</view>
						<view class="_info2">{{ item.details }}</view>
					</view>
				</view>
			</view>
			<!-- <view class="infoMap" v-show="tags == 2"></view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags: 1,
				list: []
			}
		},
		onReady() {},
		onLoad() {
			this.getData()
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			getData() {
				this.request.getRequest('/api/ma/event/list', {
					createBy: 102,
					status: 0
				}).then(res => {
					this.list = res.data
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 14rpx;
		font-weight: bold;
		overflow: hidden;

		.samlltxt {
			margin-bottom: 30rpx;
			font-size: 44rpx;
		}
	}

	.tag {
		margin-top: 30px;
		width: 100%;
		display: flex;

		.item {
			flex: 1;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			border-radius: 20rpx 20rpx 0 0;
			border: 2rpx solid #000;
			color: silver;
		}

		.active {
			border-bottom: none;
			color: #000;
		}
	}

	.list_menu {
		padding: 80rpx 60rpx 60rpx 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		line-height: 60rpx;
		font-weight: bold;
	}

	.list {
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			flex: 0 0 350rpx;
			margin: 10rpx;
			height: 322rpx;
			border: 2rpx solid black;
			border-radius: 16rpx;
			overflow: hidden;
			padding: 10rpx;
			box-sizing: border-box;

			image {
				width: 100%;
				height: 122rpx;
			}

			.item_info {
				margin-top: 10rpx;
				display: flex;

				._info1 {
					flex: 1;
					font-size: 22rpx;
					font-weight: bold;
				}

				._info2 {
					flex: 1;
				}
			}
		}
	}

	.infoMap {
		width: 100%;
		height: 80vh;
	}
</style>