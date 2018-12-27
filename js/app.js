window.app={
	
	
	/**
	 * netty服务器的地址
	 */
	nettyUrl:'ws://192.168.23.1:8088/ws',
	
	// 192.168.23.1
	// 192.168.23.1
	
	/**
	 * 后端服务发布的地址
	 */
	serverUrl: 'http://192.168.23.1:8080',
	
	
	/**
	 * 图片服务发布的地址
	 */
	imgServerUrl: 'http://192.168.23.1:8889/hai/',
	
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
	},
	
	
	/**
	 * 将连天记录保存在缓存中 key 为   chat-userId-friendid  value 为 聊天对象 
	 */
	saveChatRecord:function(userId,friendId,content,flag){
		//构建key value 保存在聊天map中
		var chatRecordObject = new app.ChatRecordObject(content,flag);
		var key = "chat-"+ userId + "-" + friendId;
		var chatRecordList = plus.storage.getItem(key);
		
		
		//第一次存到 list中
		if(app.isBlank(chatRecordList)){
			chatRecordList = [];
		}else{
			chatRecordList = JSON.parse(chatRecordList);
		}
		//加入到list中
		chatRecordList.push(chatRecordObject);
		
		//保存在缓存中
		plus.storage.setItem(key,JSON.stringify(chatRecordList));
		
	},
	
	/**
	 * 从缓存中取出snapShotList，假如没有就新建一个
	 */
	getSnapShotList: function(){
		var snapShotList = plus.storage.getItem("snapShotList");
		if(app.isBlank(snapShotList)){
			snapShotList = [];
		}else{
			snapShotList = JSON.parse(snapShotList);
		}
		
		return snapShotList;
	},
	
	/**
	 * 将聊天快照对象保存在list中
	 */
	saveShapChatShopToList:function(friendInfo,lastestContent){
		//构建聊天快照对象
		var shapChatShop = new ShapChatShop(friendInfo,lastestContent);
		
		// 从缓存中取出 map
		snapShotList =getSnapShotList();
		
		// 将原来的shapChatShop对象取出来，删除
		for(var i=0;i<snapShotList.length;i++){
			if(snapShotList[i].friendInfo.id==friendInfo.id){
				snapShotList.splice(i,0);
				break;
			}
		}
		
		// 将聊天记录保存在snapShotSet中
		snapShotList.unshift(shapChatShop);
		
		for(var i=0;i<snapShotList.length;i++){
			alert(JSON.stringify(snapShotList[i]));
		}
		
		//保存到缓存中
		plus.storage.setItem("snapShotList",JSON.stringify(snapShotList));
	},
	
	/**
	 * 聊天快照模型，保存聊天对象信息和最后一次聊天的信息
	 * @param {Object} friendInfo
	 * @param {Object} lastestContent
	 */
	ShapChatShop:function(friendInfo,lastestContent){
		this.friendInfo = friendInfo;
		this.lastestContent=lastestContent;
	},
	
	/**
	 * 聊天记录保存模型
	 */
	ChatRecordObject:function(content,flag){
		this.content=content;
		this.flag = flag;
	},
	
	
	/**
	 * 返回聊天list
	 * @param {Object} userId
	 * @param {Object} friend
	 */
	getChatRecord:function(userId,friendId){
		var key =  "chat-"+ userId + "-" + friendId;
		var chatRecordList = plus.storage.getItem(key);
		
		
		//第一次取 list中
		if(app.isBlank(chatRecordList)){
			chatRecordList = [];
		}else{
			chatRecordList = JSON.parse(chatRecordList);
		}
		
		
		
		for(var i=0;i<chatRecordList.length;i++){
			alert(chatRecordList[i].content);
		}
		
		return chatRecordList;
	},
	
	/**
	 * 渲染的枚举类型
	 */
	MY_CHAT_RECORD:1,
	FRIEND_CHAT_RECORD:2,
	
	/**
	 * 设置与后台一致的枚举类
	 */
	CONNECT:1,			//"第一次(或重连)初始化连接"
	CHAT:2,				//"聊天消息"
	SIGNED:3,			//"消息签收"
	KEEPALIVE:4,		//"客户端保持心跳"
	PULL_FRIEND:5,		//"拉取好友"
	
	/**
	 * 设置与后台一致的交互对象的构造器
	 * @param {Object} action
	 * @param {Object} chatMsgEntity
	 */
	DataContent:function(action,chatMsgEntity,extand){
		this.action=action; 				// 动作类型
		this.chatMsgEntity=chatMsgEntity;	// 用户的聊天内容entity
		this.extand = extand;				//扩展字段，用于签收信息
	},
	
	/**
	 * 设置与后台一致的交互的构造器
	 * @param {Object} senderId
	 * @param {Object} receiverId
	 * @param {Object} msg
	 * @param {Object} msgId
	 */
	ChatMsgEntity:function(senderId,receiverId,msg,msgId){
		this.senderId=senderId;		//发送至的用户id
		this.receiverId=receiverId;	//接收者的用户id
		this.msg=msg;				//聊天内容
		this.msgId=msgId;			//用于消息的签收
	},
}
