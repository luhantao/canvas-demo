define('canvas', ['jquery', 'dyadicArray'], function($, dyadicArray){
	var width = 450,
		height = 450,
		canvas = document.querySelector('#main_canvas'),
		context = canvas.getContext('2d'),
		interval = 10,		//小块间隔
		blockLength = (width - 5*interval) /4;		//单个小块宽高

	canvas.width = width;
	canvas.height = height;


	function changeStyle(value){
		if (value == 0)
			context.fillStyle = '#DACD94';
		else if (value == 2)
			context.fillStyle = '#FCF5D4';
		else if (value == 4)
			context.fillStyle = '#F5F5AA';
		else if (value == 8)
			context.fillStyle = '#F5D080';
		else if (value == 16)
			context.fillStyle = '#FFA855';
		else if (value == 32)
			context.fillStyle = '#E7750A';
		else if (value == 64)
			context.fillStyle = '#FF6A45';
		else if (value == 128)
			context.fillStyle = '#EE0D01';
		else if (value == 256)
			context.fillStyle = '#F556AB';
		else if (value == 512)
			context.fillStyle = '#C24FFC';
		else if (value == 1024)
			context.fillStyle = '#17A3EF';
		else
			context.fillStyle = '#FEE41C';
	}

	return {
		//根据数组数据，重新绘制
		paint: function(){
			context.fillStyle = '#CFC07E';
			context.font = 'bold 40px "Microsoft YaHei","宋体",sans-serif';
			//绘制背景
			context.clearRect(0, 0, width, height);
			context.fillRect(0, 0, width, height);

			var array = dyadicArray.array();

			for (var i = 0; i < array.length; i++) {
				for (var j = 0; j < array.length; j++){
					changeStyle(array[i][j]);
					//绘制单个小块
					context.fillRect(	(j+1)*interval + j*blockLength,
						 				(i+1)*interval + i*blockLength,
						  				blockLength,
						  				blockLength	);

					//绘制块中文字
					var text = array[i][j] == 0? '' : array[i][j];
					context.fillStyle = '#000';
					context.fillText(	text, 
						(j+1)*interval + (j+0.5)*blockLength -12.5*(array[i][j].toString().length),
						(i+1)*interval + (i+0.5)*blockLength +17 );
				}
			}
		},
		//随机生成一个新小块
		paintNewOne: function(){
			var newObj = dyadicArray.newOne();

			var scale = 21;
			function showNewOne(){
				if (scale <= 0){
					//检测是否游戏结束
					if (newObj.gameover){
						alert('游戏结束！');
					}					
					return;
				}

				context.fillStyle = newObj.value==4 ? '#F5F5AA' : '#FCF5D4';
				context.fillRect(	(newObj.x+1)*interval + newObj.x*blockLength + scale,
									(newObj.y+1)*interval + newObj.y*blockLength + scale,
									blockLength - 2*scale,
									blockLength	- 2*scale);

				context.fillStyle = '#000';
				context.fillText(	newObj.value, 
					(newObj.x+1)*interval + (newObj.x+0.5)*blockLength -12.5*(newObj.value.toString().length),
					(newObj.y+1)*interval + (newObj.y+0.5)*blockLength +17 );

				scale --;
				setTimeout(showNewOne, 13);
			}
			showNewOne();
		}
	};
});