/**
 * @description 评论数据列表组件
 * */
(function(V, name,_) {
	var comm_temlate_list = 
			   '<ul id="dataList" class="mui-table-view">'+
					'<li class="mui-table-view-cell mui-media" v-for="item in data">'+
						'<div @tap="to_user(item.loginname)" class="mui-media-object mui-pull-left"><img class="mui-media-object" v-lazy="item.cover">'+
						'<span class="floor font_12">{{item.index}} 楼</span></div>'+
						'<div class="mui-media-body">'+
							'<p class="font_12 color_333">{{item.loginname}}<span class="mui-pull-right">{{item.time}}</span></p>'+
							'<p class="content"><span v-html="item.content"></span></p>'+
						'</div>'+
					'</li>'+
				'</ul>';

	V.component(name, {
		template: comm_temlate_list,
		props: ['data'],
		data: function() {
			return {
				data: []
			}
		},methods:{
			to_user:function(loginname){
				console.log('loginname=====' + loginname);
			}
		}
	})
}(Vue, 'app-list',mui))