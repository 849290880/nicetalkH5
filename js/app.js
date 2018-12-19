window.app={
	
	
	/**
	 * netty服务器的地址
	 */
	nettyUrl:'ws://172.20.10.5:8088/ws',
	
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
	},
	
	/**
	 *将分组号的二维数组，保存在缓存中，以key为readyGroupFriends保存 value为二维数组字符存储
	 */
	saveReadyGroupFriends:function(friends){
		friends = JSON.stringify(friends);
		plus.storage.setItem("readyGroupFriends",friends);
	},
	
	/**
	 * 将存在缓存中的friends字符转换成json对象取出
	 */
	getReadyGroupFriends:function(){
		var friends = plus.storage.getItem("readyGroupFriends");
		friends = JSON.parse(friends);
		return friends;
	}
}
