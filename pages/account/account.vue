<template>
	<view class="container">
		<view class="container_main">
			<view class="header">
				<view class="info">
					<view class="infoTitle">{{userInfo.userName}}</view>
					<view>Member since 2023</view>
					<view>Personal account</view>
				</view>
				<view class="iocimg">
					<!-- <image src="../../static/images/icoimg.png" mode="widthFix" @click="uploadinfo()" /> -->
					<image :src="info.avatar?info.avatar:'../../static/images/icoimg.png'" mode="widthFix"
						@click="uploadinfo()" />
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
				<view @click="navigatePage('/pages/password/password')">Reset password</view>
				<view style="color: blue;" @click="signout()">Log out</view>
				<!-- <view class="more">Restart prototype </view> -->
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
				info: {},
				tags: 1,
				list: []
			}
		},
		onReady() {},
		onLoad() {
			this.getinfo()
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
			uploadinfo() {
				let _this = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log('chooseImage', res)
						const tempFilePaths = res.tempFilePaths[0];
						uni.uploadFile({
							url: _this.request.baseUrlfile + '/common/upload', //post请求的地址
							// url: _this.request.baseUrlfile + '/api/common/upload', //post请求的地址
							filePath: tempFilePaths,
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data)
								_this.request.postRequest('/api/ma/sysUser', {
									userId: this.userInfo.userId,
									avatar: data.url
								}).then(res => {
									_this.getinfo()
								});
							},
							fail: (err) => {
								console.log('err', err)
							}
						})
					}
				})
			},
			getinfo() {
				this.request.getRequest('/api/ma/sysUser/' + this.userInfo.userId, {}).then(res => {
					this.info = res.user
					this.info.avatar = res.user.avatar.replace('http', 'https');
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
	.container_main {
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 30%;
		padding-top: 6rem;
		padding-bottom: 1.2rem;
		box-sizing: border-box;
		display: flex;
	}

	.header .info {
		flex: 1;
		padding-left: 40px;
		box-sizing: border-box;
		font-weight: bold;
	}

	.header .info .infoTitle {
		font-size: 1.11rem;
	}

	.header .iocimg {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header .iocimg image {
		width: 5rem;
		height: 5rem;
	}

	.tag {
		width: 100%;
		display: flex;
	}

	.tag .item {
		flex: 1;
		height: 1.8rem;
		line-height: 1.8rem;
		text-align: center;
		font-size: 0.84rem;
		font-weight: bold;
		border-radius: 0.6rem 0.6rem 0 0;
		border: 0.06rem solid #000;
		color: silver;
	}

	.tag .active {
		border-bottom: none;
		color: #000;
	}

	.list_menu {
		padding: 2.4rem 1.8rem 1.8rem 2.4rem;
		box-sizing: border-box;
		font-size: 0.96rem;
		line-height: 1.8rem;
		font-weight: bold;
	}

	.list_menu .more {
		font-size: 0.6rem;
		color: #C0BDB3;
		text-align: right;
	}

	.list .item {
		display: flex;
		border-bottom: 0.06rem solid black;
		padding: 0.3rem 0.6rem;
	}

	.list .item img {
		max-width: 7.2rem;
		max-height: 3.6rem;
		object-fit: contain;
	}

	.list .item .item_info {
		flex: 1;
		margin-left: 1.2rem;
	}

	.list .item .item_info .item_name {
		font-size: 0.96rem;
		font-weight: bold;
	}

	.list .item .item_info .item_more {
		margin-top: 0.6rem;
		font-size: 0.84rem;
	}
</style>