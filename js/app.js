window.app={
	
	
	/**
	 * 后端服务发布的地址
	 */
	serverUrl: 'http://172.20.10.5:8080',
	
	
	/**
	 * 图片服务发布的地址
	 */
	imgServerUrl: 'http://172.20.10.5:8889/hai/',
	
	/**
	 * 判断str是否为空
	 */
	isBlank:function(str){
		if(str==null||str==undefined||str==''){
			return true;
		}
		return false;
	},
	
	/**
	 * 显示提示
	 */
	showToast:function(msg,type){
		plus.nativeUI.toast(msg,{icon:"image/"+type+".png",verticalAlign:"center"})
	},
	
	/**
	 * 保存全局对象
	 */
	saveGrobalUserInfo:function(user){
		var userInfo = JSON.stringify(user);
		plus.storage.setItem("userInfo",userInfo);
	},
	
	/**
	 * 取出全局的userInfo对象
	 */
	getGrobalUserInfo:function(){
		var userInfo = plus.storage.getItem("userInfo");
		userInfo = JSON.parse(userInfo);
		return userInfo;
	},
	
	/**
	 * 清除缓存
	 */
	clearGrobalUserInfo:function(){
		plus.storage.removeItem("userInfo");
	}
	
}
