<template>
	<view class="container">
		<pagerocker></pagerocker>
		<view class="container_main">
			<view class="upload_main">
				<image class="load_img" v-if="info.eventpic" :src="info.eventpic" mode="aspectFit" />
			</view>
			<view class="forminfo">
				<view class="title">{{info.eventname}}</view>
				<view class="line"></view>
				<view class="item">
					<view class="item_label">When?</view>
					<view class="item_value">{{ info.eventtime }}</view>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="item_label">Where?</view>
					<view class="item_value">{{ info.eventaddr }}</view>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="item_label">Who?</view>
					<view class="item_value">{{ info.details }}</view>
				</view>
				<view class="line"></view>
				<view class="more_item">
					<view class="item_l">
						<view class="item_label">Event description</view>
						<view class="item_value">
							<textarea class="c_textarea" :value="info.eventdesc" disabled></textarea>
						</view>
					</view>
					<view class="item_r">
						<view class="item" @click="setstar()">
							<image v-if="info.isCollect == 0 ||info.isCollect == null" src="@/static/images/star.png"
								mode="widthFix" />
							<image v-else src="@/static/images/star_active.png" mode="widthFix" />
						</view>
						<view class="item" @click="dialogshow1 = true">
							<image src="../../static/images/date.png" mode="widthFix" />
						</view>
						<view class="item" @click="dialogshow = true">
							<image src="../../static/images/share.png" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<view class="moreporson" v-if="info.sysUsers">
				<view class="item_ico" v-for="(item,index) in info.sysUsers">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="item_name">
					<view v-for="(item,index) in info.sysUsers">{{item.userName}},</view>
				</view>
			</view>
			<view class="dialog" v-if="dialogshow" @click="dialogshow = false">
				<view class="dialog_main_bottom">
					<image src="@/static/images/ShareSheet.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="dialog" v-if="dialogshow1" @click="dialogshow1 = false">
				<image class="Alertdate" src="@/static/images/Alert.png" mode="widthFix"
					@click="setcal(info.eventtime)"></image>
			</view>
		</view>
		<tabBar index='3'></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				dialogshow: false,
				dialogshow1: false,
			}
		},
		onReady() {},
		onLoad() {
			this.getData(this.query.id)
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {

		},
		methods: {
			getData(id) {
				this.request.getRequest('/api/ma/event/' + id).then(res => {
					this.info = res.data
				});
			},
			setstar() {
				let url = ''
				if (this.info.isCollect == 0 || this.info.isCollect == null) {
					url = '/api/ma/calendar/insert'
				} else {
					url = '/api/ma/user/attend/uncollect'
				}
				this.request.postRequest(url, {
					userid: this.userInfo.userId,
					eventid: this.query.id,
					caldate: this.info.eventtime
				}).then(res => {
					uni.$u.toast("success")
					this.getData(this.query.id)
				});
			},
			setcal(time) {
				if (time == '') {
					uni.$u.toast("Complete information")
					return
				}
				let starttime = time
				let endtime = time
				starttime = Date.parse(new Date(time + ':00'))
				endtime = new Date(time + ':00').getTime() - 2 * 60 * 60 * 1000
				let that = this;
				var Uri = plus.android.importClass("android.net.Uri");
				var main = plus.android.runtimeMainActivity();
				var userCursor = plus.android.invoke(main.getContentResolver(), "query", Uri.parse(calanderURL),
					null, null, null, null);
				plus.android.invoke(userCursor, "moveToLast");
				calId = plus.android.invoke(userCursor, "getString", plus.android.invoke(userCursor,
					"getColumnIndex",
					"_id"));
				var ContentValues = plus.android.importClass("android.content.ContentValues");
				var events = new ContentValues();
				events.put("title", "提醒内容");
				events.put("description", "提醒描述");
				// 插入账户  
				events.put("calendar_id", calId);
				//位置  可不填
				// events.put("eventLocation", "位置");
				events.put("dtstart", starttime); //时间戳 到毫秒的时间戳
				events.put("dtend", endtime); //时间戳 到毫秒的时间戳
				events.put("hasAlarm", 1);
				events.put("eventTimezone", "Asia/Shanghai"); // 这个是时区，必须有，这个就是中国标准时区，在中国境内的不必再改  
				// 添加事件    
				var newEvent = plus.android.invoke(plus.android.runtimeMainActivity().getContentResolver(),
					"insert", Uri.parse(calanderEventURL), events);
				// 事件提醒的设定  
				var id = plus.android.invoke(newEvent, "getLastPathSegment");
				var values = new ContentValues();
				values.put("event_id", id);
				// 提前15分钟有提醒  
				values.put("minutes", "15");
				values.put("method", "1");
				plus.android.invoke(main.getContentResolver(), "insert", Uri.parse(calanderRemiderURL), values);
			},
		}
	}
</script>

<style lang="less" scoped>
	.line {
		margin: 10rpx 0;
		border-bottom: 1px solid black;
	}

	.upload_main {
		height: 390rpx;
		background-color: #D9D9D9;
		display: flex;
		justify-content: center;
		align-items: center;

		.load_img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
	}

	.forminfo {
		padding: 40rpx;
		box-sizing: border-box;

		.title {
			width: 688rpx;
			height: 108rpx;
			font-family: Neue Montreal;
			font-size: 58rpx;
			font-weight: 700;
			line-height: 54rpx;
			letter-spacing: 0em;
			text-align: left;
			margin-top: 40rpx;
		}

		.item {
			padding: 12rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.item_label {
			font-family: Neue Montreal;
			font-size: 30rpx;
			font-weight: 700;
			line-height: 26rpx;
			letter-spacing: 0em;
			text-align: left;
		}

		.item_value {
			font-family: Neue Montreal;
			font-size: 24rpx;
			font-weight: 400;
			line-height: 26rpx;
			letter-spacing: 0em;
			text-align: left;
		}

		.c_input {
			border: none;
			outline: none;
			background: transparent;
			text-align: right;
			font-size: 24rpx;
		}

		.more_item {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			overflow: hidden;

			.item_l {
				width: 50%;
				flex: 0 0 50%;
			}

			.item_r {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: end;

				.item {
					width: 140rpx;
					height: 62rpx;
					border-radius: 20rpx;
					background: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 40rpx;

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}

		.c_textarea {
			margin-top: 30rpx;
			width: 100%;
			height: 150rpx;
			font-size: 20rpx;
		}
	}

	.moreporson {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.item_ico {
			image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-right: -30rpx;
				border: 1px solid black;
			}
		}

		.item_name {
			font-weight: bold;
			font-size: 28rpx;
			margin-left: 40rpx;
			display: flex;
		}
	}

	.Alertdate {
		position: absolute;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		width: 500rpx;
	}

	.dialog {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);

		.dialog_main_bottom {
			position: absolute;
			bottom: 0%;
			left: 0%;
			right: 0%;
			margin: auto;
			width: 100%;
			border-radius: 20rpx;
			border: 4rpx solid black;
			background-color: #F5F4F0;
			box-sizing: border-box;
			padding: 30rpx;

			image {
				width: 100%;
			}
		}
	}
</style>