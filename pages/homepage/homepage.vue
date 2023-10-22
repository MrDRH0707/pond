<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="p6_main1 rollIn animated">
				I want to...
			</view>
			<view class="btn flex-center" @click="createpond()" style="margin-top: 60px;">
				create
			</view>
			<view class="btn flex-center" @click="navigatePage('/pages/attend/attending')" style="margin-top: 30px;">
				attend
			</view>
			<view class="btn flex-center" @click="navigatePage('/pages/browse/browse')" style="margin-top: 30px;">
				browse
			</view>
			<view class="dialog" v-if="dialogshow">
				<view class="dialog_main fadeInUp animated">
					<view class="dialog_content">
						<view class="size top">
							Welcome to your homepage!
						</view>
						<view class="size top">
							Here, you'll have the option to
						</view>
						<view class="size top">
							<view class="list">
								<view>Create new events</view>
								<view>Attend events</view>
								<view>Browse events via maps and your network</view>
								<view>Access your account profile</view>
								<view>Access your starred events as well as the events you've created</view>
							</view>
						</view>
					</view>
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
	export default {
		data() {
			return {
				dialogshow: false
			}
		},
		onReady() {},
		onLoad() {
			setTimeout(() => {
				this.dialogshow = true
			}, 1000)
		},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {
			createpond() {
				this.resetCache()
				this.navigatePage('/pages/create/hosting')
			}
		}
	}
</script>

<style lang="less" scoped>
	.container_main {
		font-size: 0.9rem;
		font-weight: bold;
	}

	.p6_main1 {
		width: 16.8rem;
	}

	.btn {
		width: 12rem;
		height: 6rem;
		background-color: #fff;
		border-radius: 1.2rem;
	}

	.size {
		font-family: Neue Montreal;
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 1.08rem;
		letter-spacing: 0em;
		text-align: left;
	}

	.top {
		margin-top: 0.4rem;
	}

	.list {
		line-height: 1.6rem;
		margin-left: 1.5rem;
	}

	.list view::before {
		content: "";
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 0.36rem;
		background-color: #2c3e50;
		margin-right: 0.78rem;
	}

	.left-img {
		width: 3rem;
		height: 3rem;
	}

	.dialog_footer {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 0.9rem 0 0;
		font-family: Neue Montreal;
		font-size: 0.72rem;
		font-weight: 700;
		line-height: 0.84rem;
		letter-spacing: 0em;
	}

	.dialog_footer image {
		width: 3rem;
		height: 3rem;
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

	.dialog .dialog_main {
		position: absolute;
		top: 0%;
		bottom: 0%;
		left: 0%;
		right: 0%;
		margin: auto;
		width: 18rem;
		height: 21rem;
		border-radius: 0.6rem;
		border: 0.12rem solid black;
		background-color: #F5F4F0;
		box-sizing: border-box;
		padding: 0.9rem;
		overflow: auto;
		display: flex;
		flex-direction: column;

		.dialog_content {
			flex: 1;
		}
	}
</style>