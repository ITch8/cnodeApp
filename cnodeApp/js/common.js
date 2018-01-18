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
	u.mypost = function(postUrl, pdata, type, success, error) {
		setTimeout(function() {
			_.ajax({
				url: ASKURL + postUrl,
				type: type || 'post',
				data: pdata,
				dataType:'json',
				timeout: 60000,
				success: function(data) {
					console.log('data=======' + JSON.stringify(data));
					_.isFunction(success) ? success(data) : '';
				},
				error: function(xhr) {
					_.isFunction(error) ? error() : _.toast('網酪連接超時');
				}
			});
		}, 50);
	};
})(window, mui, window.util = {});

/**
		 * 1、将服务端返回数据，转换成前端需要的格式
		 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
		 * 
		 * @param {Array} items 
		 */
		function convert(items) {
			var newItems = [];
			items.forEach(function(item) {
				newItems.push({
					id: item.id,
					title: item.title,
					author: item.author.loginname,
					cover: item.author.avatar_url,
					time: dateUtils.format(item.create_at)
				});
			});
			return newItems;
		}

		/**
		 * 打开新闻详情
		 * 
		 * @param {Object} item 当前点击的新闻对象
		 */
		function open_detail(item) {
			//触发子窗口变更新闻详情
			mui.fire(webview_detail, 'get_detail', {
				id: item.id,
				title: item.title,
				author: item.author,
				time: item.time,
				cover: item.cover
			});

			//更改详情页原生导航条信息
			titleNView.titleText = item.title;
			webview_detail.setStyle({
				"titleNView": titleNView
			});
			setTimeout(function() {
				webview_detail.show("slide-in-right", 300);
			}, 150);
		}

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