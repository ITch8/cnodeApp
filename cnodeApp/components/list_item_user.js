/**
 * @description 数据列表组件
 * */
(function(V, name,_) {
	var temlate_list = 
			   '<ul id="dataList" class="mui-table-view">'+
				'<li class="mui-table-view-cell mui-media" v-for="item in data">'+
					'<a :data-guid="item.id" @tap="open_detail(item)">'+
						'<img class="mui-media-object mui-pull-left" v-lazy="item.cover">'+
						'<div class="mui-media-body">'+
							'<div class="mui-ellipsis">{{item.title}}</div>'+
						'</div>'+
						'<div class="meta-info">'+
							'<div class="author">{{item.loginname}}</div>'+
							'<div class="time">{{item.time}}</div>'+
						'</div>'+
					'</a>'+
				'</li>'+
			'</ul>';

	V.component(name, {
		template: temlate_list,
		props: ['data'],
		data: function() {
			return {
				data: []
			}
		},
		methods: {
			open_detail: function(item) {
				webview_detail = plus.webview.getWebviewById('detail');
				mui.fire(webview_detail, 'get_detail', {
					id: item.id,
					title: item.title,
					author: item.author,
					time: item.time,
					cover: item.cover
				});
			
				//更改详情页原生导航条信息
				titleNView.titleText = item.title;
				webview_detail && webview_detail.setStyle({
					"titleNView": titleNView
				});
				setTimeout(function() {
					webview_detail && webview_detail.show("slide-in-right", 300);
				}, 150);
			}
		}
	})
}(Vue, 'app-list',mui))