const baseUrl = 'http://hmmobile.eastseastone.com' // 正式环境
const baseUrlfile = 'http://hmmobile.eastseastone.com' // 正式文件地址
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
 * GET接口
 * @param {String} url  接口地址
 * @param {object} date  请求参数对象
 * @param {boolean} loding  是否显示加载中loding（默认显示，true显示，false隐藏）
 */
const getRequest = (url, date, loding = true) => {
	if (loding) {
		uni.hideLoading();
		clearTimeout(timer)
		timer = setTimeout(() => {
			uni.showLoading({
				title: '加载中'
			});
		}, 300)
	}
	let baseDefaultOpts = {
		url: baseUrl + url, // 请求接口地址
		data: date, // 传入请求参数
		method: 'GET', // 请求方式
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
 * POST接口
 * @param {String} url  接口地址
 * @param {object} date  请求参数对象
 * @param {boolean} loding  是否显示加载中loding（默认显示，true显示，false隐藏）
 */
const postRequest = (url, date, loding = true) => {
	if (loding) {
		uni.hideLoading();
		clearTimeout(timer)
		timer = setTimeout(() => {
			uni.showLoading({
				title: '加载中'
			});
		}, 300)
	}
	let baseDefaultOpts = {
		url: baseUrl + url, // 请求接口地址
		data: date, // 传入请求参数
		method: 'POST', // 请求方式
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
 * 接口数据返回处理
 * @param {object} response  返回的数据
 * @param {function} callback  回调
 */
const handle = (response, callback) => {
	if (response[1].statusCode == 200) {
		if (response[1].data.code != 200) {
			uni.$u.toast("请求报错")
			return false;
		}
		let [error, res] = response;
		callback(res.data);
	} else {
		uni.$u.toast("请求报错")
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