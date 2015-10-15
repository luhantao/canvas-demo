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
		'cookie': 'modules/cookie',
		'history': 'modules/history',
		'operate': 'modules/operate'
	}
});

require(['less']);

require(['dyadicArray', 'canvas', 'history'], function(dyadicArray, canvas, history){
	//检测cookie有没存有记录
	if (!history.getCookieRecord() ){
		dyadicArray.init(4);	//随机初始化游戏数组
	}
	else{
		var cookieArr = history.getCookieRecord();
		dyadicArray.setArray(cookieArr);
	}
	//存储当前状态为allSteps的第一步
	history.saveOneStep(dyadicArray.array());


	//加载移动模块，绑定键盘事件
	require(['move'], function(move){
		move();
	});
	//加载左栏按钮模块
	require(['operate'], function(operate){
		operate(4);
	});
	

	canvas.paint();			//绘制canvas

	//关闭浏览器或刷新页面时，存储数组
	history.saveBeforeUnload();
});
