<template>
	<view class="container">
		<view class="container_main  flex-center">
			<view>Create an account here.Its free</view>
			<view class="btn" v-if="!focu" @click="focu = true">
				<view>Enter your phone or email</view>
				<view>here</view>
			</view>
			<view class="btn" v-else>
				<input type="text" :focus="focu" v-model="phonenumber" @blur="onblur" @confirm="doSearch">
			</view>
			<view style="margin-top: 35px;">Or</view>
			<view class="nav flex-acenter">
				<view @click="onfacebook()">
					<image src="../../static/images/04-REGISTER2.png" mode="widthFix" />
				</view>
				<view @click="onInstagram()">
					<image src="../../static/images/04-REGISTER3.png" mode="widthFix" />
				</view>
				<!-- <view>
					<image src="../../static/images/Apple_logo_black.png" mode="widthFix" />
				</view> -->
			</view>
			<view style="margin-top: 55px;">Already have an account?
				<view class="ahref" @click="navigatePage('/pages/loginnext/loginnext')">Login</view>
			</view>
		</view>
		<view class="footer" @click="doSearch()">
			<view>
				<image src="../../static/images/Arrow-47left.png" class="left-img" alt="" mode="widthFix" />
			</view>
			<view class="footer-text">
				Click to continue
			</view>
		</view>
	</view>
</template>

<script>
	const facebook = uni.requireNativePlugin("sn-facebook");
	const instagramModule = uni.requireNativePlugin("BenBen-InstagramLogin")
	const modal = uni.requireNativePlugin('modal');
	export default {
		data() {
			return {
				focu: false,
				phonenumber: ''
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			onblur(e) {
				if (e.target.value == '') {
					this.focu = false
				}
			},
			doSearch() {
				if (this.phonenumber == '') {
					uni.$u.toast("Complete information")
					return
				}
				const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
				if(!phoneReg.test(this.phonenumber)){
					uni.$u.toast("Incorrect format")
					return
				}
				this.navigatePage('/pages/register/register', {
					phonenumber: this.phonenumber
				})
			},
			onfacebook() {
				var _this = this
				facebook.getKeyHash((e) => {
					if (e.code == 0) {
						let keyhash = e.keyHash[0];
						console.log("keyhash", keyhash);
					}
				});
				facebook.login((e) => {
					console.log('facebooklogin', e)
					_this.request.postRequest('/api/ma/sysUser/login', {
						loginType: "FBlogin",
						fbData: e.data
					}).then(res => {
						uni.setStorageSync('token', res.token)
						this.getUserInfo()
					});
				});
			},
			onInstagram() {
				plus.globalEvent.addEventListener('TestEvent', function(e) {
					modal.toast({
						message: "TestEvent收到：" + e.msg,
						duration: 1.5
					});
				});
				instagramModule.instagramLogin({
						'instagram_client_id': '869040044902747',
						'instagram_secret': '95043d7d4cab716da530780cb05d9f24',
						'instagram_redirect_url': 'https://www.instagram.com'
					},
					(ret) => {
						modal.toast({
							message: ret,
							duration: 1.5
						});
					})
			},
			// 获取用户信息
			getUserInfo() {
				this.request.getRequest('/api/ma/sysUser/getInfo', {}).then(res => {
					console.log(res)
					let userInfo = res.user
					uni.setStorageSync('userInfo', JSON.stringify(userInfo))
					this.switchTabPage('/pages/homepage/homepage')
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.container {
		font-size: 25rpx;
		font-weight: bold;
	}

	.btn {
		margin-top: 140rpx;
		width: 500rpx;
		height: 150rpx;
		border-radius: 30rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
	}

	.nav {
		margin-top: 140rpx;
		justify-content: center;

		view {
			margin: 0 10rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #fff;

			image {
				width: 60rpx;
			}
		}
	}


	.ahref {
		display: inline-block;
		color: #ea5844;
		text-decoration: underline;
	}

	.footer {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 30rpx 60rpx;
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
</style>