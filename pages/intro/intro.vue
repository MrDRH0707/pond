<template>
	<view class="container">
		<view class="container_main  flex-center" @click="next()">
			<image class="logo" :class="{anima:anima}" src="../../static/images/LOGO.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				anima: false
			}
		},
		onReady() {},
		onLoad() {},
		onShow() {},
		onHide() {},
		created() {},
		mounted() {},
		onUnload() {},
		methods: {
			next() {
				this.anima = true
				setTimeout(() => {
					this.navigatePage('/pages/entry/entry')
				}, 800)
				setTimeout(() => {
					this.anima = false
				}, 3000)
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo {
		width: 12rem;
	}

	.anima {
		animation-name: rotation;
		animation-duration: 3s;
	}

	@keyframes rotation {
		0% {
			transform: translate(0);
		}

		50% {
			width: 6.3rem;
			transform: translate(3rem, -11rem);
		}

		100% {
			width: 6.3rem;
			transform: translate(3rem, -11rem);
		}
	}
</style>