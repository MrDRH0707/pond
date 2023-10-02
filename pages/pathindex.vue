<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {
			const token = uni.getStorageSync("token");
			if (token) {
				uni.switchTab({
					url: '/pages/homepage/homepage',
				})
			} else {
				uni.reLaunch({
					url: '/pages/intro/intro'
				})
			}
		}
	}
</script>

<style>

</style>
