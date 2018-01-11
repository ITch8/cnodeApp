var ASKURL = "https://cnodejs.org/api/v1/";
(function(w, _, u) {

	/**@des 辅助工具--请求数据
	 * @param postUrl  请求接口
	 * @param pdata  请求参数
	 * @param type  请求方式
	 * @param show 是否显示加载中
	 * @param success 請求成功回调函数
	 * @param error 请求失敗回调函数
	 * */
	u.mypost = function(postUrl, pdata, type, show, success, error) {
//		if(show) {
//			plus.nativeUI.showWaiting("努力加載中...");
//		}
		setTimeout(function() {
			_.ajax({
				url: ASKURL + postUrl,
				type: type || 'post',
				data: pdata,
				timeout: 60000,
				success: function(data) {
					console.log('data=======' + JSON.stringify(data));
//					plus.nativeUI.closeWaiting();
					_.isFunction(success) ? success(data) : '';
				},
				error: function(xhr) {
//					plus.nativeUI.closeWaiting();
					_.isFunction(error) ? error() : _.toast('網酪連接超時');
				}
			});
		}, 50);
	};
})(window, mui, window.util = {});

/**
 * 格式化时间的辅助类，将一个时间转换成x小时前、y天前等
 */
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		mui.each(this.UNITS, function(unit, value) {
			if(milliseconds >= value) {
				humanize = Math.floor(milliseconds / value) + unit + '前';
				return false;
			}
			return true;
		});
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if(diff < this.UNITS['天']) {
			return this.humanize(diff);
		}

		var _format = function(number) {
			return(number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};