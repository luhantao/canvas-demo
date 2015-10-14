//模块配置信息
require.config({
	//baseUrl: "./",
	paths: {
		//工具模块
		'less': 'tools/less.min',
		'jquery': 'tools/jquery.min',

		//功能模块
		'canvas': 'modules/canvas',					//初始化canvas模块
		'dyadicArray': 'modules/dyadicArray',		//二维数组记录区块
		'move': 'modules/move', 					//监听上下左右键盘事件
	}
});

require(['less']);

require(['dyadicArray', 'canvas'], function(dyadicArray, canvas){
	dyadicArray.init(4);	//随机初始化游戏数组
	canvas.paint();			//初始绘制canvas

	//加载移动模块，绑定键盘事件
	require(['move'], function(move){
		move();
	});
});

