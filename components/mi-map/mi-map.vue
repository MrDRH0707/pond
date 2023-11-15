<template>
	<view class="server-place">
		<map id='map' ref='map' v-bind:style="{height: mapH + 'px'}" style="width: 100%;" :latitude="latitude"
			:longitude="longitude" :controls='controls' @regionchange='mapChange'>
		</map>

		<!-- #ifndef APP-PLUS -->
		<cover-image v-bind:style="{left: controlsLeft + 'px', top: controlsTop + 'px'}" class="controls-location"
			:src="positionIcon"></cover-image>
		<!-- #endif -->

		<view class="map-tools">
			<view class="my-location" @tap="toMyLocation">
				<image class="left" :src="myPositionIcon" mode=""></image>
				<view class="right">
					<text class="title">my place</text>
					<text class="text">{{myAddress}}</text>
				</view>
			</view>

			<view class="start-place">
				<view class="place">
					<text class="title">{{tipText}}：</text>
					<text class="text">{{addressObj.address}}</text>
				</view>
				<view class="tip">{{descText}}</view>
				<button @tap="submitAdress" class="sure" type="primary">Confirm</button>
			</view>
		</view>
	</view>

</template>

<script>
	const app = getApp()
	var QQMapWX = require('./qqmap-wx-jssdk.min.js')
	var qqmapsdk = new QQMapWX({
		key: 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
	})
	export default {
		props: {
			tipText: {
				type: String,
				default: 'Selected'
			},
			descText: {
				type: String,
				default: 'location on a map'
			},
			positionIcon: {
				type: String,
				default: 'https://s2.ax1x.com/2020/03/10/8CvKmt.png'
			},
			myPositionIcon: {
				type: String,
				// default: '/static/mi-map/position2.png',
				default: 'https://s2.ax1x.com/2020/03/10/8CjxSJ.png'
			}
		},
		data() {
			return {
				mapH: 0,
				mapW: 0,
				longitude: 0,
				latitude: 0,
				myAddress: '',
				addressObj: {
					longitude: '',
					latitude: '',
					address: 'Please select location'
				},
				controlsLeft: 1000,
				controlsTop: 1000,
				controls: [],

			};
		},
		mounted() {
			this.getLocation()
			this.initMapH()
			this.initPositionIcon()
		},
		methods: {
			initPositionIcon() {

				setTimeout(() => {
					// #ifndef APP-PLUS
					this.controlsLeft = this.mapW / 2 - 10
					this.controlsTop = this.mapH / 2
					// #endif

					// #ifdef APP-PLUS
					var controls = {
						id: '1',
						iconPath: this.positionIcon,
						position: {
							left: this.mapW / 2 - 10,
							top: this.mapH / 2 - 100,
							width: 30,
							height: 30,
						},
						clickable: false
					}
					this.controls.push(controls)
					console.log(this.controls, '==========');
					// #endif
				}, 100)
			},
			getLocation() {
				let this_ = this
				uni.getLocation({
					// type: 'gcj02', 
					geocode: true,
					success: function(res) {
						this_.initMap(res)
						console.log(res);
					},
					fail: function(e) {
						uni.showToast({
							icon: 'none',
							title: 'Failed to obtain address. Please check if location permission is enabled'
						})
					}
				})
			},

			async initMap(res) {
				this.longitude = res.longitude;
				this.latitude = res.latitude;
				this.myAddress = await this.getAddressName(res);

				this.addressObj = Object.assign({}, this.addressObj, {
					longitude: res.longitude,
					latitude: res.latitude,
					address: this.myAddress
				})
			},

			async checkMap(res) {
				this.addressObj = Object.assign({}, this.addressObj, {
					longitude: res.longitude,
					latitude: res.latitude,
					address: await this.getAddressName(res)
				})
				console.log('current location:' + res.latitude + '|' + res.longitude);
			},

			mapChange(e) {
				let that = this
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if (e.type == 'regionchange' || e.type == 'end') {
						that.mapCtx = uni.createMapContext('map', this)
						that.mapCtx.getCenterLocation({
							success: res => {
								this.checkMap(res)
								console.log(res);
							},
							fail: err => {
								console.log(err);
							}
						})
					}
				}, 200)
			},
			getAddressName(addressObj) {
				return new Promise((res) => {
					// #ifdef APP-PLUS
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: addressObj.latitude,
							longitude: addressObj.longitude
						},
						get_poi: 1,
						poi_options: "page_size=1;page_index=1",
						output: 'jsonp',
						success: (e) => {
							res(e.result.formatted_addresses.recommend);
						},
						fail: err => {
							res(err);
						}
					})
					// #endif

					// #ifdef H5
					const KEY = 'LXCBZ-NNIKD-UZ64F-H6AFI-UNJLH-OCFGE'
					let locationObj = addressObj.latitude + ',' + addressObj.longitude
					let url =
						'https://apis.map.qq.com/ws/geocoder/v1?coord_type=5&get_poi=1&output=jsonp&poi_options=page_size=1;page_index=1';
					this.$jsonp(url, {
							key: KEY,
							location: locationObj
						}).then(e => {
							res(e.result.formatted_addresses.recommend);
						})
						.catch(err => {
							res(err);
						})
					// #endif

					// #ifdef MP-WEIXIN
					console.log(addressObj, '======================');
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: addressObj.latitude,
							longitude: addressObj.longitude
						},
						get_poi: 1,
						poi_options: "page_size=1;page_index=1",
						output: 'jsonp',
						success: (e) => {
							res(e.result.formatted_addresses.recommend);
						},
						fail: err => {
							res(err);
						}
					})
					// #endif


				})

			},
			initMapH() {
				// #ifdef APP-PLUS
				this.mapW = uni.getSystemInfoSync().windowWidth
				this.mapH = uni.getSystemInfoSync().windowHeight - 210;
				// #endif
				// #ifndef APP-PLUS
				this.mapW = uni.getSystemInfoSync().windowWidth
				this.mapH = uni.getSystemInfoSync().windowHeight - 170;
				// #endif

				// #ifdef MP-WEIXIN
				this.mapW = uni.getSystemInfoSync().windowWidth
				this.mapH = uni.getSystemInfoSync().windowHeight - 210;
				// #endif
			},
			toMyLocation() {
				this.getLocation()
			},
			// 提交
			submitAdress() {
				this.controls = []
				setTimeout(() => {
					this.$emit('updateAddress', this.addressObj)
				}, 100)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.controls-location {
		height: 30px;
		width: 30px;
		position: absolute;
	}

	.server-place {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 100%;
		background: #ffffff;
		z-index: 999;

		.map-tools {
			position: fixed;
			width: 100%;
			bottom: 30rpx;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.my-location {
				width: 90%;
				margin: 0 auto;
				height: 120rpx;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				overflow: hidden;

				.left {
					background: #3384ff;
					// flex: 20%;
					width: 120rpx;
					height: 100%;
				}

				.right {
					margin-left: 20rpx;
					color: #111;
					display: flex;
					justify-content: center;
					align-items: flex-start;
					flex-direction: column;

					.title {
						font-size: 28rpx;
						font-weight: bold;
					}

					.text {
						font-size: 26rpx;
						width: 500rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #3384FF;
						margin-top: 10rpx;
					}
				}
			}

			.start-place {
				width: 85%;
				margin: 0 auto;
				margin: 0 auto;
				margin-top: 20rpx;
				box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
				background: #fff;
				border-radius: 20rpx;
				padding: 20rpx;

				.place {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.title {
						font-size: 28rpx;
						font-weight: bold;
						color: #111;
					}

					.text {
						font-size: 28rpx;
						color: #3384FF;
						font-weight: bold;
						width: 450rpx;
						display: inline-block;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				.tip {
					font-size: 22rpx;
					color: #666;
					margin-top: 15rpx;
				}

				.sure {
					margin-top: 15rpx;
					color: #FFFFFF;
					background: #212121;
					font-weight: blod;
					font-size: 32rpx;
				}

			}
		}
	}
</style>