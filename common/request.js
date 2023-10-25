const baseUrl = 'https://hmmobile.eastseastone.com'
const baseUrlfile = 'https://hmmobile.eastseastone.com'
// const baseUrl = 'https://2016kt6872.oicp.vip'
// const baseUrlfile = 'https://2016kt6872.oicp.vip'
// const baseUrl = 'http://c63database.mysql.database.azure.com'
// const baseUrlfile = 'http://c63database.mysql.database.azure.com'

/* =============================================================================================== */
let _this = null; // this指向
let timer;


/**
 * 带入this指向
 * @param {Object} vm_this  this
 */
const sendThis = (vm_this) => {
	_this = vm_this;
};


/**
 * GET
 * @param {String} url  
 * @param {object} date  
 * @param {boolean} loding 
 */
const getRequest = (url, date, loding = true) => {
	if (loding) {
		uni.hideLoading();
		clearTimeout(timer)
		timer = setTimeout(() => {
			uni.showLoading({
				title: 'loading'
			});
		}, 300)
	}
	let baseDefaultOpts = {
		url: baseUrl + url,
		data: date,
		method: 'GET',
		header: {
			'X-GcSoft-Token': uni.getStorageSync('token'),
		},
		dataType: 'json',
	}
	let promise = new Promise((resolve, reject) => {
		uni.request(baseDefaultOpts).then((response) => {
			if (loding) {
				clearTimeout(timer)
				uni.hideLoading();
			}
			handle(response, (res) => resolve(res))
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
	return promise
}


/**
 * POST
 * @param {String} url  
 * @param {object} date  
 * @param {boolean} loding  
 */
const postRequest = (url, date, loding = true) => {
	if (loding) {
		uni.hideLoading();
		clearTimeout(timer)
		timer = setTimeout(() => {
			uni.showLoading({
				title: 'loading'
			});
		}, 300)
	}
	let baseDefaultOpts = {
		url: baseUrl + url,
		data: date,
		method: 'POST',
		header: {
			'X-GcSoft-Token': uni.getStorageSync('token'),
		},
		dataType: 'json',
	}
	let promise = new Promise((resolve, reject) => {
		uni.request(baseDefaultOpts).then((response) => {
			if (loding) {
				clearTimeout(timer)
				uni.hideLoading();
			}
			handle(response, (res) => resolve(res))
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
	return promise
}


/**
 * callback data
 * @param {object} response  
 * @param {function} callback  
 */
const handle = (response, callback) => {
	if (response[1].statusCode == 200) {
		if (response[1].data.code != 200) {
			uni.$u.toast(response[1].data.msg || "error")
			return false;
		}
		let [error, res] = response;
		callback(res.data);
	} else {
		uni.$u.toast("error")
		return false;
	}
}


export default {
	sendThis,
	baseUrl,
	baseUrlfile,
	getRequest,
	postRequest,
}