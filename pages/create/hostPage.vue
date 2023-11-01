<template>
	<view class="container">
		<pagerockerdef @back='back' @next='submit()'></pagerockerdef>
		<view class="container_main">
			<view class="tipmini">
				<view>{{userInfo.userName}}, We’ve populated your event page for you</view>
			</view>
			<view class="line"></view>
			<view class="upload_main">
				<image class="load_img" v-if="fileimg" :src="fileimg" mode="aspectFill" @click="uploadinfo()" />
				<view class="upload_btn" v-else @click="uploadinfo()">
					Insert event artwork here
				</view>
			</view>
			<view class="forminfo">
				<view class="title">{{query.title}}</view>
				<view class="line"></view>
				<view class="item" @click="ondatatime()">
					<view class="item_label">When?</view>
					<view class="item_value">{{ eventtime }}</view>
				</view>
				<view class="line"></view>
				<!-- <view class="item" @click="mapShow=true" > -->
				<view class="item" @click="navigatePage('/pages/create/selarea')">
					<view class="item_label">Where?</view>
					<view class="item_value">
						<input class="c_input" v-model="positionObj.address" type="text" disabled
							placeholder="Insert location">
					</view>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="item_label">Who?</view>
					<view class="item_value">
						<input class="c_input" v-model="details" disabled type="text" placeholder="Insert host details">
					</view>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="item_label">tab</view>
					<view class="item_value">{{ dataStr }}</view>
				</view>
				<view class="line"></view>
				<view class="more_item">
					<view class="item_l">
						<view class="item_label">Event description</view>
						<view class="item_value">
							<textarea class="c_textarea" v-model="eventdesc"
								placeholder="Insert event description here. Max 200 characters."></textarea>
						</view>
						<view class="more_info fadeInUp animated" @click="dialogshow = true">
							<image src="../../static/images/Group8932watch.png" mode="widthFix" />
							<view>More options</view>
						</view>
					</view>
					<view class="item_r">
						<view class="item" @click="dialogshow1 = true">
							<image src="../../static/images/date.png" mode="widthFix" />
						</view>
						<view class="item" @click="dialogshow2 = true">
							<image src="../../static/images/share.png" mode="widthFix" />
						</view>
						<view class="item">
							<image src="../../static/images/Socialbutton.png" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<datatime ref="datatime" @change="datatimechange"></datatime>
			<!-- <mi-map v-if="mapShow" ref="miMap" @updateAddress="updateAddress"></mi-map> -->
			<view class="dialog1" v-if="dialogshow1" @click="dialogshow1 = false">
				<image class="Alertdate fadeInUp animated" src="@/static/images/Alert.png" mode="widthFix"
					@click="getplatform(eventtime)">
				</image>
			</view>
			<view class="dialog2" v-if="dialogshow2" @click="dialogshow2 = false">
				<view class="dialog_main_bottom">
					<image src="@/static/images/ShareSheet.png" mode="widthFix" @click="share"></image>
				</view>
			</view>
			<view class="dialog" v-if="dialogshow">
				<view class="dialog_main fadeInUp animated">
					<view class="section">
						Some more options to help you customise your event
						Privacy settings
					</view>
					<view class="section" style="font-size: 40rpx;">
						Sharing settings
					</view>
					<view class="section" style="font-size: 40rpx;">
						Additional settings
					</view>
					<view class="soon">COMING SOON</view>
					<view class="dialog_footer">
						<image src="../../static/images/Arrow-47left.png" @click="dialogshow = false" class="left-img"
							mode="widthFix" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	var calanderURL = "content://com.android.calendar/calendars";
	var calanderEventURL = "content://com.android.calendar/events";
	var calanderRemiderURL = "content://com.android.calendar/reminders";
	var calId;
	const facebook = uni.requireNativePlugin("sn-facebook");
	import datatime from "../../components/datatime/datatime.vue"
	// import miMap from '../../components/mi-map/mi-map.vue'
	export default {
		components: {
			datatime,
			// miMap
		},
		data() {
			return {
				fileimg: '',
				eventtime: '',
				wherename: '',
				details: '',
				eventdesc: '',
				// mapShow: false,
				positionObj: {
					address: '',
					longitude: '',
					latitude: '',
				},
				dialogshow2: false,
				dialogshow1: false,
				dialogshow: false
			}
		},
		onReady() {},
		onLoad() {
			// #ifdef APP-PLUS
			let that = this;
			that.requestAndroidPermission('android.permission.READ_CALENDAR'); // 读取日历
			that.requestAndroidPermission('android.permission.WRITE_CALENDAR'); // 写入日历
			// #endif
			let Cache = this.getCache()
			this.details = this.userInfo.userName
			this.dataStr = this.query.dataStr || ''
			this.fileimg = Cache.eventpic || ''
			this.eventtime = Cache.eventtime || ''
			this.positionObj.address = Cache.eventaddr || ''
			this.positionObj.longitude = Cache.xpos || ''
			this.positionObj.latitude = Cache.ypos || ''
			this.eventdesc = Cache.eventdesc || ''
		},
		onShow() {
			let that = this
			uni.$on('updateData', function(data) {
				that.positionObj.address = data.address || ''
				that.positionObj.longitude = data.lng || ''
				that.positionObj.latitude = data.lat || ''
			})

			// #ifndef APP-PLUS
			that.positionObj.address = 'Cape York 1 Loyalty Beach Road, New Mapoon QLD 4876澳大利亚'
			that.positionObj.longitude = '142.3837876'
			that.positionObj.latitude = '-10.8341935'
			// #endif
		},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				if (result == 1) {
					// "已获得授权"
				} else if (result == 0) {
					uni.$u.toast("未获得授权");
				} else {
					uni.$u.toast("被永久拒绝权限");
				}
			},
			uploadinfo() {
				let _this = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log('chooseImage', res)
						const tempFilePaths = res.tempFilePaths[0];
						uni.uploadFile({
							url: _this.request.baseUrlfile + '/common/upload', //post请求的地址
							filePath: tempFilePaths,
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								console.log('uploadFileRes', data)
								_this.fileimg = data.url.replace('http', 'https');
							},
							fail: (err) => {
								console.log('err', err)
							}
						})
					}
				})
			},
			// 选择完整日期
			ondatatime(e) {
				this.$refs.datatime.openpicker(e);
			},
			// 完整日期回调
			datatimechange(row) {
				this.eventtime = row.split('-').reverse().join('/')
			},
			// // 更新地址并关闭地图
			// updateAddress(addressObj) {
			// 	this.mapShow = false
			// 	// #ifdef APP-PLUS
			// 	this.positionObj = addressObj
			// 	//#endif
			// 	// #ifndef APP-PLUS
			// 	this.positionObj = {
			// 		"longitude": 115.02089142246793,
			// 		"latitude": 35.77559943073253,
			// 		"address": "华龙区金辉职高生活区(政和一路北)"
			// 	}
			// 	// #endif
			// },
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
				events.put("title", "活动提醒");
				events.put("description", "pond为您提醒您选择的活动");
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
				uni.$u.toast("success")
			},
			share() {
				facebook.share({
						type: 0,
						url: "https://m.facebook.com",
						quote: "test"
					},
					(e) => {
						console.log(e)
					},
				);
			},
			submit() {
				if (this.fileimg == '' || this.eventtime == '' || this.positionObj.address == '' ||
					this.eventdesc == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/create/hostPreview', {
					title: this.query.title,
					dataStr: this.query.dataStr,
					dataStrId: this.query.dataStrId,
					eventpic: this.fileimg,
					eventtime: this.eventtime,
					eventaddr: this.positionObj.address,
					xpos: this.positionObj.longitude,
					ypos: this.positionObj.latitude,
					details: this.details,
					eventdesc: this.eventdesc,
				})
			},
			back() {
				this.setCache({
					title: this.query.title,
					dataStr: this.query.dataStr,
					dataStrId: this.query.dataStrId,
					eventpic: this.fileimg,
					eventtime: this.eventtime,
					eventaddr: this.positionObj.address,
					xpos: this.positionObj.longitude,
					ypos: this.positionObj.latitude,
					eventdesc: this.eventdesc,
				})
				this.historyback()
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

		.upload_btn {
			width: 388rpx;
			height: 58rpx;
			background-color: #fff;
			text-align: center;
			line-height: 58rpx;
			border-radius: 20rpx;
			font-family: Neue Montreal;
			font-size: 26rpx;
			font-weight: 700;
			letter-spacing: 0em;
			text-align: center;
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

		.more_info {
			font-family: Neue Montreal;
			font-size: 30rpx;
			font-weight: 700;
			line-height: 26rpx;
			letter-spacing: 0em;
			text-align: left;
			margin-top: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}
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

	.dialog1 {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);
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
				margin-bottom: 60rpx;
			}

			.soon {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 45rpx;
				color: #fff;
				background-color: #076AFF;
				transform: rotate(-30deg);
				width: 360rpx;
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
			}
		}

		.dialog_footer {
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
			// display: flex;
			// flex-direction: column;
			// align-items: flex-end;
			// margin: 30rpx 0;
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