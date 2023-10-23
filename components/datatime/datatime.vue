/**
* 选择年月日
*/
<template>
	<view>
		<u-datetime-picker mode="date" v-model="dataTime" :show="showtype" cancelText="cancel" confirmText="confirm" @confirm="confirmtime"
			@cancel="showtype = false">
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
			// 打开
			openpicker() {
				this.showtype = true
			},
			// 选择返回
			confirmtime(e) {
				this.$emit("change", this.format(e.value))
				this.showtype = false
			},
			// 日期转换
			format(val) {
				let add0 = (m) => {
					return m < 10 ? '0' + m : m
				}
				var time = new Date(val);
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
