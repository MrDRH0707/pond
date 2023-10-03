<template>
	<view class="pagerocker">
		<image src="../../static/images/return.png" mode="widthFix" @click="historyback()"></image>
		<image v-if="shownext" src="../../static/images/Arrow-47left.png" mode="widthFix"
			@click="navigatePage(nexturl)">
		</image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shownext: false,
				nexturl: '',
			};
		},
		created() {
			let pages = getCurrentPages();
			if (pages[pages.length - 2]) {
				console.log(72)
				this.nexturl = pages[pages.length - 2].route
				this.shownext = true
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>