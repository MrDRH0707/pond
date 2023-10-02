<template>
	<view class="container">
		<view class="container_main">
			<image class="pageoff" src="../../static/images/off.png" mode="widthFixw" @click="historyback()"></image>
			<view class="tiptxt">
				I want to<view class="green">create</view>an event called<view class="green">{{ query.title }}</view>
				with
				<view class="silver" v-if="data.length == 0">what</view>
				<view class="green" v-else>{{dataStr}}</view>
			</view>
			<view class="tipmini">
				<view>Choose your event tags from the options below</view>
				<view>The more specific, the better</view>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index" @click="change(item)">
					{{ item.tabname }}
				</view>
			</view>
			<view class="next" @click="submit()">
				Create a custom tag
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				dataid: [],
				dataStr: '',
				dataStrId: '',
				list: [],
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
				this.request.getRequest('/api/ma/tab/list', {}).then(res => {
					console.log(119, res)
					this.list = res.data
				});
			},
			change(str) {
				var data = this.data
				var dataid = this.dataid
				if (data.indexOf(str.tabname) == -1) {
					data.push(str.tabname);
					dataid.push(str.id);
				} else {
					data.splice(data.indexOf(str.tabname), 1);
					dataid.splice(dataid.indexOf(str.id), 1);
				}
				var str = data.join(',')
				var strid = dataid.join(',')
				this.dataStr = str;
				this.dataStrId = strid;
			},
			submit() {
				if (this.dataStr == '') {
					uni.$u.toast("Complete information")
					return
				}
				this.navigatePage('/pages/hostConf/index', {
					title: this.query.title,
					dataStr: this.dataStr,
					dataStrId: this.dataStrId
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container_main {
		padding: 20rpx 0;
	}

	.tiptxt {
		margin: 140rpx auto 0;
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

		.green {
			color: #03A727;
			padding: 0 10rpx;
		}

		.silver {
			color: #C0BDB3;
			padding: 0 10rpx;
		}

		.tipinput {
			padding-top: 25rpx;
			box-sizing: border-box;
			border: none;
			outline: none;
			background-color: transparent;
			box-shadow: none;
			display: inline-block;
			width: 200rpx;
			font-size: 50rpx;
			height: 60rpx;
			color: #03A727;
		}
	}

	.tipmini {
		margin: 50rpx auto 0;
		width: 660rpx;
		font-size: 26rpx;
		font-weight: bold;
		overflow: hidden;
	}

	.list {
		padding: 60rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			width: 290rpx;
			height: 140rpx;
			border-radius: 50rpx;
			background-color: #fff;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			font-weight: bold;
		}
	}

	.next {
		display: inline-block;
		padding: 15rpx 30rpx;
		border-radius: 50rpx;
		background-color: #fff;
		text-align: center;
		font-weight: bold;
		margin: 40rpx 0 0 40rpx;
	}
</style>