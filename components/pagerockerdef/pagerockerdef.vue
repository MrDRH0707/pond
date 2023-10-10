<template>
	<view class="pagerocker">
		<image src="../../static/images/return.png" mode="widthFix" @click="$emit('back')"></image>
		<image src="../../static/images/Arrow-47left.png" mode="widthFix" @click="$emit('next')">
		</image>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style>

</style>