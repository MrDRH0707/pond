<template>
	<view>
		<u-datetime-picker mode="date" v-model="dataTime" :show="showtype" cancelText="cancel" confirmText="confirm"
			@confirm="confirmtime" @cancel="showtype = false">
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showtype: false,
				dataTime: Number(new Date())
			};
		},
		methods: {
			openpicker() {
				this.showtype = true
			},
			confirmtime(e) {
				this.$emit("change", this.format(e.value))
				this.showtype = false
			},
			format(val) {
				let add0 = (m) => {
					return m < 10 ? '0' + m : m
				}
				var time = new Date(val);
				console.log(123, time)
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				return y + '-' + add0(m) + '-' + add0(d);
			},
		}
	}
</script>

<style>

</style>