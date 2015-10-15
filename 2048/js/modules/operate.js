define('operate', ['jquery', 'history', 'dyadicArray', 'canvas'], function($, history, dyadicArray, canvas){
	return function(size){
		$('#options').on('click', '.restart', function(e){
			dyadicArray.init(size);
			canvas.paint();
			//删除cookie
			// history.removeCookieRecord();
			
			//清空allSteps历史记录数组，并存储当前步
			history.clearAllSteps();
			history.saveOneStep(dyadicArray.array());
		});

		$('#options').on('click', '.go_back', function(e){
			var lastStep = history.restoreOneStep();
			if (!lastStep){
				//最前一步，无法撤回
				alert('已是最前一步，无法撤回');
			}
			else{
				dyadicArray.setArray(lastStep);
				canvas.paint();
			}
		});
	}
})