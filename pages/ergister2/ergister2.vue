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
				<view>
					<image src="../../static/images/Apple_logo_black.png" mode="widthFix" />
				</view>
			</view>
			<view style="margin-top: 55px;">Already have an account?
				<view class="ahref" @click="navigatePage('/pages/loginnext/loginnext')">Login</view>
			</view>
			<view class="ahref" style="margin-top: 25px;" @click="navigatePage('/pages/password/password')">forgot
				password</view>
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
				this.navigatePage('/pages/register/register', {
					phonenumber: this.phonenumber
				})
			},
			onfacebook() {
				// uni.login({
				// 	provider: 'facebook',
				// 	success: function(loginRes) {
				// 		console.log('你倒是登录进来呀', loginRes)
				// 		// 登录成功
				// 		uni.getUserInfo({
				// 			provider: 'facebook',
				// 			success: function(info) {
				// 				console.log('用户的信息', loginRes)
				// 				// 获取用户信息成功, info.authResult保存用户信息
				// 				this.switchTabPage('/pages/homepage/homepage')
				// 			}
				// 		})
				// 	},
				// 	fail: function(err) {
				// 		// 登录授权失败  
				// 		// err.code是错误码
				// 	}
				// });
				// this.navigatePage('/pages/loginfb/loginfb')
				facebook.getKeyHash((e) => {
					if (e.code == 0) {
						let keyhash = e.keyHash[0];
						console.log("keyhash", keyhash);
					}
				});
				setTimeout(() => {
					facebook.login((e) => {
						console.log("login", e);
						// e 对象如下
						// {
						//     result: true,
						//     data: {
						//         token: '',
						//         userId: '',
						//         name: '',
						//         email: '',
						//         gender: '',
						//         birthday: ''
						//         photo: ''
						//     }
						// }
					});

					// facebook.fetchDeferredAppLink((e) => {
					// 	if (e.code == 0) {
					// 		console.log('eee', e)
					// 		// e.url // for iOS
					// 		// e.data // for Android
					// 	}
					// });


					// facebook.isLoggedIn((e) => {
					// 	if (e == true) {
					// 		// 已登录
					// 		console.log("isLoggedIn", e);
					// 	}
					// });
					// facebook.getUserInfo({
					// 		// 返回字段，更多字段请查看 https://developers.facebook.com/docs/graph-api/reference/user/
					// 		fields: "id, name, email, gender, birthday, picture", // 可选参数，示例是默认值
					// 	},
					// 	(e) => {
					// 		console.log("getUserInfo", e);
					// 	},
					// );
				}, 800)
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