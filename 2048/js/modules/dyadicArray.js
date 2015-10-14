define('dyadicArray', ['jquery'], function($){
	var array;

	function randomArray(size){
		array = [];
		var count = 0;
		for (var i = 0; i < size; i++){
			var row = [];
			for (var j = 0; j < size; j++){
				var ranNum = Math.random();
				if (ranNum < 0.8){
					row.push(0);
				}
				else if (ranNum < 0.93){
					row.push(2);
					count ++;
				}
				else{
					row.push(4);
					count ++;
				}
			}
			array.push(row);
		}
		if (count <3){
			arguments.callee(size);
		}
	}

	return {
		//初始化随机数组
		init: randomArray,
		//移动后添加新的一格
		newOne: function(){
			var possibility = [];
			for (var i = 0; i < array.length; i++){
				for (var j = 0; j < array.length; j++){
					if (array[i][j] == 0){
						var value = Math.random()>0.6? 4 : 2;
						var obj = {
							x: j,
							y: i,
							value: value,
							gameover: false
						}
						possibility.push(obj);
					}
				}
			}

			var random = Math.floor( Math.random() * possibility.length );
			//更新array数据
			array[possibility[random].y][possibility[random].x] = possibility[random].value;
			//检测是否游戏结束
			if (possibility.length == 1){
				var gameover = true;
				for (var i = 0; i < array.length; i++){
					for (var j = 0; j < array.length; j++){
						if (i+1 < array.length){
							if (array[i][j] == array[i+1][j]){
								gameover = false;
							}
						}
						if (j+1 <array.length){
							if (array[i][j] == array[i][j+1]){
								gameover = false;
							}
						}
					}
				}
				if (gameover){
					possibility[random].gameover = true;
				}
			}
			
			return possibility[random];
		},
		array: function(){
			return array;
		}
	};
});