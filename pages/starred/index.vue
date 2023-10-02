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
				<view class="item" v-for="(item, index) in list">
					<img :src="item.eventpic" alt="">
					<view class="item_info">
						<view class="item_name">{{ item.eventname }}</view>
						<view class="item_more">{{ item.eventaddr }}</view>
					</view>
					<image class="collect" src="../../static/images/collect.png" mode="widthFix"></image>
				</view>
			</view>
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
				this.request.getRequest('/api/ma/user/attend/list', {
					userid: 102,
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
		.item {
			position: relative;
			display: flex;
			border-bottom: 2rpx solid black;
			padding: 10rpx 20rpx;

			img {
				max-width: 240rpx;
				max-height: 120rpx;
				object-fit: contain;

			}

			.item_info {
				flex: 1;
				margin-left: 40rpx;


				.item_name {
					font-size: 32rpx;
					font-weight: bold;
				}

				.item_more {
					margin-top: 20rpx;
					font-size: 28rpx;
				}
			}

			.collect {
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				width: 50rpx;
			}
		}
	}
</style>