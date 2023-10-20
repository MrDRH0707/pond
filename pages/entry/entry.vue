<template>
	<view class="container">
		<view class="container_main flex-center">
			<view class="p2_main1">
				Welcome to the
			</view>
			<view class="logo_main">
				<image class="p2_ioc1" src="../../static/images/p2_ioc1.png" mode="widthFix" />
				<image class="logoico" src="../../static/images/LOGO.png" mode="widthFix" />
			</view>
			<view class="btn p2_btn1 animate__fadeInUpBig animate__animated"
				@click="navigatePage('/pages/ergister/ergister')">
				<view>This is my</view>
				<view>first time here</view>
			</view>
			<view class="btn p2_btn2 animate__flipInX animate__animated"
				@click="navigatePage('/pages/ergister2/ergister2')">
				<view>l already have</view>
				<view>an account</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.p2_main1 {
		width: 9rem;
		font-size: 0.66rem;
		font-weight: bold;
	}

	.logo_main {
		margin-top: 0.6rem;
		position: relative;
		width: 12.6rem;
	}

	.logo_main .p2_ioc1 {
		width: 100%;
	}

	.logo_main .logoico {
		position: absolute;
		top: 0;
		right: 0;
		width: 6.3rem;
	}

	.btn {
		margin-top: 4.2rem;
		width: 15rem;
		height: 4.5rem;
		border-radius: 0.9rem;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 0.66rem;
		font-weight: bold;
	}

	.p2_btn1 {
		margin-top: 4.2rem;
	}

	.p2_btn2 {
		margin-top: 2.4rem;
	}
</style>