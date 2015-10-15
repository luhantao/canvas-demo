define('cookie', ['jquery'], function($){
	//cookie失效时间
	var expires = 30*24*60*60*1000;
	return {
		checkCookieEnable : function(){
			if(!(document.cookie || navigator.cookieEnabled)){
				return false;
			}
			return true;
		},
		setCookie : function(name, value){
			var exp = new Date(); 
		　　exp.setTime(exp.getTime() + expires);
		　　document.cookie = name + "="+ encodeURI(value) + ";expires=" + exp.toUTCString(); 
		},
		deleteCookie: function(name){
			var exp = new Date(); 
		　　exp.setTime(exp.getTime() - expires);
		　　document.cookie = name + "=aaa;expires=" + exp.toUTCString(); 
		},
		getCookie : function(c_name){
			if (document.cookie.length > 0){
			  	c_start = document.cookie.indexOf(c_name + "=");
			  	if (c_start != -1){ 
				    c_start = c_start + c_name.length + 1 ;
				    c_end = document.cookie.indexOf(";", c_start);
				    if (c_end ==-1){
				    	c_end = document.cookie.length;
				    }
				    return decodeURI(document.cookie.substring(c_start, c_end));
			    } 
			}
			return "";
		}
	};
});


