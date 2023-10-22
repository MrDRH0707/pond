<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.request.sendThis(this);
			this.utils.sendThis(this);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import "static/css/animate.css";
	@import "static/css/public.scss";
	/* #endif */
</style>