<template>
	<view class="container">
		<view class="container_main">
			<view class="tipmini">
				<view>Han, we've pre-populated your event page for you. Feel free to customise as you'd like.</view>
			</view>
			<view class="line"></view>
			<view class="upload_main">
				<image class="load_img" v-if="fileimg" :src="fileimg" mode="aspectFit" />
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
				<view class="item" @click="mapShow=true">
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
						<input class="c_input" v-model="details" type="text" placeholder="Insert host details">
					</view>
				</view>
				<view class="line"></view>
				<view class="more_item">
					<view class="item_l">
						<view class="item_label">Event description</view>
						<view class="item_value">
							<textarea class="c_textarea" v-model="eventdesc"
								placeholder="Insert event description here. Max 200 characters."></textarea>
						</view>
						<view class="more_info" @click="submit()">
							<image src="../../static/images/Group8932watch.png" mode="widthFix" />
							<view>More options</view>
						</view>
					</view>
					<view class="item_r">
						<view class="item" @click="dialogshow1 = true">
							<image src="../../static/images/date.png" mode="widthFix" />
						</view>
						<view class="item">
							<image src="../../static/images/share.png" mode="widthFix" />
						</view>
						<view class="item">
							<image src="../../static/images/Socialbutton.png" mode="widthFix" />
						</view>
					</view>
				</view>
			</view>
			<datatime ref="datatime" @change="datatimechange"></datatime>
			<mi-map v-if="mapShow" ref="miMap" @updateAddress="updateAddress"></mi-map>
			<view class="dialog" v-if="dialogshow1" @click="dialogshow1 = false">
				<image class="Alertdate" src="@/static/images/Alert.png" mode="widthFix" @click="setcal(eventtime)">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	import datatime from "../../components/datatime/datatime.vue"
	import miMap from '../../components/mi-map/mi-map.vue'
	export default {
		components: {
			datatime,
			miMap
		},
		data() {
			return {
				fileimg: '',
				eventtime: '',
				wherename: '',
				details: '',
				eventdesc: '',
				mapShow: false,
				positionObj: {},
				dialogshow1: false
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			uploadinfo() {
				let _this = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log('chooseImage', res)
						const tempFilePaths = res.tempFilePaths[0];
						uni.uploadFile({
							url: _this.request.baseUrlfile + '/api/common/upload', //post请求的地址
							filePath: tempFilePaths,
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								console.log('uploadFileRes', data)
								_this.fileimg = data.url;
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
				this.eventtime = row.slice(0, 13)
			},
			// 更新地址并关闭地图
			updateAddress(addressObj) {
				this.mapShow = false
				// #ifdef APP-PLUS
				this.positionObj = addressObj
				//#endif
				// #ifndef APP-PLUS
				this.positionObj = {
					"longitude": 115.02089142246793,
					"latitude": 35.77559943073253,
					"address": "华龙区金辉职高生活区(政和一路北)"
				}
				// #endif
			},
			setcal(time) {
				if (time == '') {
					uni.$u.toast("Complete information")
					return
				}
				let starttime = time
				let endtime = time
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
			submit() {
				if (this.fileimg == '' || this.eventtime == '' || this.positionObj.address == '' || this.details == '' ||
					this.eventdesc == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/hostPreview/index', {
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

	.dialog {
		position: fixed;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>