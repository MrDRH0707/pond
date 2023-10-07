<template>
	<view class="container">
		<view class="container_main  flex-center" @click="navigatePage('/pages/entry/entry')">
			<image class="logo" src="../../static/images/LOGO.png" mode="widthFix"></image>
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
		methods: {}
	}
</script>

<style lang="less" scoped>
	.logo {
		width: 150px;
	}
</style>