let _this = null;


/**
 * 
 * @param {Object} vm_this  
 */
const sendThis = (vm_this) => {
	_this = vm_this;
};


/**
 * app Locationa
 * @param {function} callback  
 */
const getLocationa = (callback) => {
	uni.getLocation({
		type: 'wgs84',
		success: res => {
			callback(res)
		},
		fail: error => {
			console.log("获取定位失败了", error)
			uni.showModal({
				title: '提示',
				content: '获取定位失败，是否授权打开定位',
				success: (res) => {
					if (res.confirm) {
						uni.getSystemInfo({
							success: (sys) => {
								if (sys.platform == 'ios') {
									plus.runtime.openURL("app-settings://");
								} else {
									var main = plus.android
										.runtimeMainActivity();
									var Intent = plus.android.importClass(
										"android.content.Intent");
									//可能应该直接进入应用列表的权限设置？=> android.settings.APPLICATION_SETTINGS
									var mIntent = new Intent(
										'android.settings.LOCATION_SOURCE_SETTINGS'
									);
									main.startActivity(mIntent);
								}
							}
						})
					}
				}
			})
		}
	});
}


export default {
	sendThis,
	getLocationa,
}