<template>
	<view class="container">
		<view class="pagerocker">
			<image src="../../static/images/return.png" mode="widthFix" @click="historyback()"></image>
		</view>
		<view class="container_main">
			<view class="upload_main">
				<image class="load_img" v-if="info.eventpic" :src="info.eventpic" mode="aspectFill" />
			</view>
			<view class="forminfo">
				<view class="title">{{ info.eventname }}</view>
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
				<view class="item">
					<view class="item_label">tab?</view>
					<view class="item_value">
						<view class="spanview" v-for="(item, index) in info.tabtbEntityList">{{ item.tabname }}</view>
					</view>
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
							<image v-if="info.isCollect == 0 || info.isCollect == null" src="@/static/images/star.png"
								mode="widthFix" />
							<image v-else src="@/static/images/star_active.png" mode="widthFix" />
						</view>
						<view class="item" @click="dialogshow1 = true">
							<image src="../../static/images/date.png" mode="widthFix" />
						</view>
						<view class="item" @click="dialogshow2 = true">
							<image src="../../static/images/share.png" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<view class="moreporson" v-if="info.sysUsers">
				<view class="item_ico" v-for="(item, index) in info.sysUsers">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="item_name">
					<view v-for="(item, index) in info.sysUsers">{{ item.userName }},</view>
				</view>
			</view>
			<view class="dialog2" v-if="dialogshow2" @click="dialogshow2 = false">
				<view class="dialog_main_bottom">
					<image src="@/static/images/ShareSheet.png" mode="widthFix" @click="share"></image>
				</view>
			</view>
			<view class="dialog2" v-if="dialogshow1" @click="dialogshow1 = false">
				<image class="Alertdate" src="@/static/images/Alert.png" mode="widthFix"
					@click="getplatform(info.eventtime)"></image>
			</view>
			<view class="dialog" v-if="dialogshow">
				<view class="dialog_main">
					<view class="section">
						These are all the events that fit your search. We’ve listed them in order of relevance.
					</view>
					<view class="section">
						You can star events and view them later via your account profile.
					</view>
					<view class="section">
						If you want to edit any part of your search, click the <text
							style="color: #237BFF;margin:0 10rpx">blue</text> text and you will be taken back to
						that section.
					</view>
					<view class="section">
						Click into an event to see more information.
					</view>
					<view class="dialog_footer">
						<image src="../../static/images/Arrow-47left.png" @click="dialogshow = false" class="left-img"
							mode="widthFix" />
					</view>
				</view>
			</view>
		</view>
		<tabBar index='3'></tabBar>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	var calanderURL = "content://com.android.calendar/calendars";
	var calanderEventURL = "content://com.android.calendar/events";
	var calanderRemiderURL = "content://com.android.calendar/reminders";
	var calId;
	const facebook = uni.requireNativePlugin("sn-facebook");

	export default {
		data() {
			return {
				info: {},
				dialogshow2: false,
				dialogshow1: false,
				dialogshow: true
			}
		},
		onReady() {},
		onLoad() {
			// #ifdef APP-PLUS
			let that = this;
			that.requestAndroidPermission('android.permission.READ_CALENDAR');
			that.requestAndroidPermission('android.permission.WRITE_CALENDAR');
			// #endif
			this.getData(this.query.id)
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {

		},
		methods: {
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				if (result == 1) {} else if (result == 0) {
					uni.$u.toast("Unauthorized");
				} else {
					uni.$u.toast("Permanently denied permission");
				}
			},
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
			getplatform(time) {
				uni.getSystemInfo({
					success: res => {
						if (res.platform === 'android') {
							this.setcal(time)
						}
					}
				})
			},
			setcal(time) {
				if (time == '') {
					uni.$u.toast("Complete information")
					return
				}
				let newtime = time.split('/').reverse().join('-')
				let starttime = newtime
				let endtime = newtime
				starttime = Date.parse(new Date(newtime + ' 12:00:00'))
				endtime = new Date(newtime + ' 12:00:00').getTime() - 2 * 60 * 60 * 1000

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
				events.put("title", "Event reminder");
				events.put("description", "pond Remind you of the selected activity");
				events.put("calendar_id", calId);
				// events.put("eventLocation", "area");
				events.put("dtstart", starttime);
				events.put("dtend", endtime);
				events.put("hasAlarm", 1);
				events.put("eventTimezone", "Asia/Shanghai");
				var newEvent = plus.android.invoke(plus.android.runtimeMainActivity().getContentResolver(),
					"insert", Uri.parse(calanderEventURL), events);
				var id = plus.android.invoke(newEvent, "getLastPathSegment");
				var values = new ContentValues();
				values.put("event_id", id);
				values.put("minutes", "15");
				values.put("method", "1");
				plus.android.invoke(main.getContentResolver(), "insert", Uri.parse(calanderRemiderURL), values);
				uni.$u.toast("success")
			},
			share() {
				facebook.share({
						type: 0,
						url: "https://m.facebook.com",
						quote: "pond"
					},
					(e) => {
						console.log(e)
					},
				);
			}
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

		.spanview {
			display: inline-block;
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

	.dialog2 {
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
</style>