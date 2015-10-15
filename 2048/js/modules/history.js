define('history', ['jquery', 'cookie', 'dyadicArray'], function($, cookie, dyadicArray){
	var allSteps = [];
	return {
		getCookieRecord: function(){
			if (cookie.getCookie('unloadRecord') == ''){
				return false;
			}
			else{
				var arr_str = cookie.getCookie('unloadRecord');
				return JSON.parse(arr_str);
			}
		},
		removeCookieRecord: function(){
			cookie.deleteCookie('unloadRecord');
		},
		clearAllSteps: function(){
			allSteps = [];
		},
		saveOneStep: function(stepArr){
			//一定要循环深拷贝!!!
			var curStep = [];
			for (var i =0; i < stepArr.length; i++){
				var row = stepArr[i].concat();
				curStep.push(row);
			}
			//最大存储步数
			if (allSteps.length >= 20){
				allSteps.shift();
			}
			allSteps.push(curStep);
		},
		restoreOneStep: function(){
			if (allSteps.length > 1){
				//丢弃最新的一步
				allSteps.pop();
				//一定要深拷贝!!!!!!
				var returnStep = [];
				for (var i = 0; i < allSteps[allSteps.length -1].length; i++){
					var row = allSteps[allSteps.length -1][i].concat();
					returnStep.push(row);
				}
				return returnStep;
			}
			else{
				//已经是第一步
				return false;
			}
		},
		saveBeforeUnload: function(){
			$(window).on('beforeunload', function(){
				//return '确认离开?'
				var array = dyadicArray.array();
				cookie.setCookie('unloadRecord', JSON.stringify(array));
			});
		}
	};
});