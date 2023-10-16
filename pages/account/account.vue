<template>
	<view class="container">
		<view class="container_main">
			<view class="header">
				<view class="info">
					<view class="infoTitle">Han Magotra</view>
					<view>Member since 2023</view>
					<view>Personal account</view>
				</view>
				<view class="iocimg">
					<image src="../../static/images/icoimg.png" mode="widthFix" />
					<view>@hannahmagotra</view>
				</view>
			</view>
			<view class="tag">
				<view class="item" :class="{ 'active': tags == 1 }" @click.stop="tags = 1">My Account</view>
				<view class="item" :class="{ 'active': tags == 2 }" @click.stop="tags = 2">Your Created Events</view>
			</view>
			<view class="list_menu" v-if="tags == 1">
				<view>My details</view>
				<view>Account settings</view>
				<view>Privacy</view>
				<view>Enterprise & business settings</view>
				<view>Socials</view>
				<view>Invite friends</view>
				<view>Help</view>
				<view>Legal stuff</view>
				<view @click="navigatePage('/pages/password/password')">forgot password</view>
				<view style="color: blue;" @click="signout()">Log out</view>
				<view class="more">Restart prototype </view>
			</view>
			<view class="list" v-if="tags == 2">
				<view class="item" v-for="(item, index) in list"
					@click="navigatePage('/pages/attend/eventdetail',{id:item.id})">
					<img :src="item.eventpic" alt="">
					<view class="item_info">
						<view class="item_name">{{ item.eventname }}</view>
						<view class="item_more">{{ item.eventaddr }}</view>
					</view>
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
				this.request.getRequest('/api/ma/event/list', {
					createBy: this.userInfo.userId,
				}).then(res => {
					this.list = res.data
				});
			},
			// 提出登录
			signout() {
				uni.clearStorageSync('token')
				uni.clearStorageSync('userInfo')
				this.navigatePage('/pages/pathindex')
			},
		}
	}
</script>

<style lang="less" scoped>
	.header {
		margin-top: 100px;
		display: flex;

		.info {
			flex: 1;
			padding-left: 40px;
			box-sizing: border-box;
			font-weight: bold;

			.infoTitle {
				font-size: 37rpx;
			}
		}

		.iocimg {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 80px;
			}
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

		.more {
			font-size: 20rpx;
			color: #C0BDB3;
			text-align: right;
		}
	}

	.list {
		.item {
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
		}
	}
</style>