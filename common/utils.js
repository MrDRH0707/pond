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
			console.log("Failed to obtain location", error)
			uni.showModal({
				title: 'tip',
				content: 'Failed to obtain location. Are you authorized to open the location',
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