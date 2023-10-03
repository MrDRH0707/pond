/**
* 全选择日期
*/
<template>
	<view>
		<u-datetime-picker mode="datetime" v-model="dataTime" cancelText="cancel" confirmText="confirm" :show="showtype" v-if="showtype" @confirm="confirmtime"
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
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
			},
		}
	}
</script>

<style>

</style>
