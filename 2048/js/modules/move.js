define('move', ['jquery', 'canvas', 'dyadicArray'], function($, canvas, dyadicArray){
	return function(){
		$(window).on('keydown', function(event){
			var keyCode = event.keyCode;
			if (keyCode >36 && keyCode < 41){
				event.preventDefault();
				var array = dyadicArray.array();

				switch(keyCode){
					case 37:
					//向左
						// console.log('left');
						var hasChanged = false;
						for (var i = 0; i < array.length; i++){
							var row = [];
							for (var j = 0; j < array.length; j++){
								if (array[i][j] != 0){
									row.push(array[i][j]);
								}	
							}

							var add = false;
							var rowLength = row.length;
							for (var k = 1; k < rowLength; k++){
								if (row[k] == row[k-1] && !add){
									add = true;
									row[k] = row[k]*2;
									row.splice(k-1, 1);
								}
								else{
									add = false;
								}
							}
							while (row.length < array.length){
								row.push(0);
							}

							for (var j = 0; j < array.length; j++){
								if (array[i][j] != row[j]){
									hasChanged = true;
								}
								array[i][j] = row[j];
							}
						}

						//重新绘制canvas
						if (hasChanged){
							canvas.paint();
							canvas.paintNewOne();
						}
						break;

					case 38:
					//向上
						// console.log('up');
						var hasChanged = false;
						for (var j = 0; j < array.length; j++){
							var col = [];
							//按列将非0的格子取出
							for (var i = 0; i < array.length; i++){
								if (array[i][j] != 0){
									col.push(array[i][j]);
								}
							}
							//相加操作
							var add = false;
							var colLength = col.length;
							for (var k = 1; k < colLength; k++){
								if (col[k] == col[k-1] && !add){
									add = true;
									col[k] = col[k]*2;	
									col.splice(k-1, 1);
								}
								else{
									add = false;
								}
							}
							//在列数组中后面补0
							while(col.length < array.length){
								col.push(0);
							}
							//更新array
							for (var i = 0; i < array.length; i++){
								if (array[i][j] != col[i]){
									hasChanged = true;
								}
								array[i][j] = col[i];
							}
						}

						//重新绘制canvas
						if (hasChanged){
							canvas.paint();
							canvas.paintNewOne();
						}
						break;

					case 39:
					//向右
						// console.log('right');
						var hasChanged = false;
						for (var i = 0; i < array.length; i++){
							var row = [];
							for (var j = 0; j < array.length; j++){
								if (array[i][j] != 0){
									row.push(array[i][j]);
								}	
							}

							var add = false;
							var rowLength = row.length;
							for (var k = rowLength - 2; k >= 0; k--){
								if (row[k] == row[k+1] && !add){
									add = true;
									row[k] = row[k]*2;
									row.splice(k+1, 1);
								}
								else{
									add = false;
								}
							}
							while (row.length < array.length){
								row.unshift(0);
							}

							for (var j = 0; j < array.length; j++){
								if (array[i][j] != row[j]){
									hasChanged = true;
								}
								array[i][j] = row[j];
							}
						}

						//重新绘制canvas
						if (hasChanged){
							canvas.paint();
							canvas.paintNewOne();
						}
						break;

					case 40:
					//向下
						// console.log('down');
						var hasChanged = false;
						for (var j = 0; j < array.length; j++){
							var col = [];
							//按列将非0的格子取出
							for (var i = 0; i < array.length; i++){
								if (array[i][j] != 0){
									col.push(array[i][j]);
								}
							}
							//相加操作
							var add = false;
							for (var k = col.length -2; k >=0; k--){
								if (col[k] == col[k+1] && !add){
									add = true;
									col[k] = col[k]*2;	
									col.splice(k+1, 1);
								}
								else{
									add = false;
								}
							}
							//在列数组中前面补0
							while(col.length < array.length){
								col.unshift(0);
							}
							//更新array
							for (var i = 0; i < array.length; i++){
								if (array[i][j] != col[i]){
									hasChanged = true;
								}
								array[i][j] = col[i];
							}
						}

						//重新绘制canvas
						if (hasChanged){
							canvas.paint();
							canvas.paintNewOne();
						}
						break;
				}
			}
		});
	}
});