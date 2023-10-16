<template>
	<view class="container">
		<view class="container_main">
			<view class="tiptxt">
				I want to<view class="blue">attend</view>an event in
				<view class="blue">{{query.title}}</view>on
				<view class="blue">{{query.dateStr}}</view>with
				<view class="blue">{{query.dataStr}}</view>
			</view>
			<view class="tag">
				<view class="item" :class="{ 'active': tags == 1 }" @click.stop="tags = 1">Tile</view>
				<view class="item" :class="{ 'active': tags == 2 }" @click.stop="tags = 2">Map</view>
			</view>
			<view class="list" v-show="tags == 1">
				<view class="item" v-for="(item, index) in list"
					@click="navigatePage('/pages/attend/eventdetail',{id:item.id})">
					<view class="star" @click.stop="setstar(item)">
						<image v-if="item.isCollect == 0 ||item.isCollect == null" src="@/static/images/star.png"
							mode="widthFix" />
						<image v-else src="@/static/images/star_active.png" mode="widthFix" />
					</view>
					<image class="imagemain" :src="item.eventpic" alt="" mode="aspectFit" />
					<view class="item_info">
						<view class="_info1">
							<view>{{ item.eventname }}</view>
							<view>{{ item.eventaddr }}</view>
						</view>
						<view class="_info2">{{ item.details }}</view>
					</view>
				</view>
			</view>
			<view class="infoMap" v-show="tags == 2"></view>
		</view>
		<tabBar index='3'></tabBar>
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
				// eventname:活动名称
				// eventaddr:活动地址
				// tabList:[1,2,3]  标签
				// dateType:传数字   1今天  2明天  3本周
				this.request.getRequest('/api/ma/event/list', {
					eventname: this.query.title,
					// dateType: this.query.dateType,
					// tabList: this.query.dataStrId,
				}).then(res => {
					this.list = res.data
				});
			},
			setstar(row) {
				let url = ''
				if (row.isCollect == 0 || row.isCollect == null) {
					url = '/api/ma/calendar/insert'
				} else {
					url = '/api/ma/user/attend/uncollect'
				}
				this.request.postRequest(url, {
					userid: this.userInfo.userId,
					eventid: String(row.id),
					caldate: row.eventtime
				}).then(res => {
					uni.$u.toast("success")
					this.getData(this.query.id)
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.tiptxt {
		margin: 80rpx auto;
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
	}


	.tag {
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

	.list {
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.item {
			position: relative;
			flex: 0 0 340rpx;
			margin: 10rpx;
			height: 322rpx;
			border: 2rpx solid black;
			border-radius: 16rpx;
			overflow: hidden;
			padding: 10rpx;
			box-sizing: border-box;

			.imagemain {
				width: 100%;
				height: 122rpx;
			}

			.star {
				position: absolute;
				z-index: 1;
				top: 0;
				right: 0;
				padding: 20rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.item_info {
				margin-top: 10rpx;
				display: flex;

				._info1 {
					flex: 0 0 50%;
					font-size: 22rpx;
					font-weight: bold;
				}

				._info2 {
					flex: 0 0 50%;
					font-size: 24rpx;
					word-wrap: break-word;
					overflow: hidden;
				}
			}
		}
	}

	.infoMap {
		width: 100%;
		height: 80vh;
	}
</style>