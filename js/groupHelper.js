
window.groupUtils={
	
	/**
	 * 将一个中文字符数组，分成按首字母分组
	 */
	groupByFirstPinyin:function(list){
		if(app.isBlank(list)){
			return [];
		}
		
		for(var i=0;i<list.length;i++){
			var pinying = words.getPingYinFromWords(list[i].nickname);
			//分类加入到二维数组中
			this.addgroup(pinying,list[i]);
		}
		return this.Character;
	},
	Character:{'A':[],'B':[],'C':[],'D':[],'E':[],'F':[],'G':[],'H':[],'I':[],'J':[],
	'K':[],'L':[],'M':[],'N':[],'O':[],'P':[],'Q':[],'R':[],'S':[],'T':[],'U':[],'V':[],'W':[],'X':[],'Y':[],'Z':[],'#':[]},
	
	/**
	 * 清空二维数组
	 */
	clearCharacter:function(){
		for(var name in this.Character){
			this.Character[name]=[];
		}
	},
	
	/**
	 * 将pingying分类加入到二维数组中
	 */
	addgroup:function(pinying,friends){
		var firstCharacter = this.fetchPinyin(pinying);
		for(var name in this.Character){
			if(name===firstCharacter){
				this.Character[name].push(friends);
				break;
			}
			if(name==='#'){
				this.Character['#'].push(friends);
			}
		}
		
	},
	
	/**
	 * 截取第一个pinyin字母
	 */
	fetchPinyin:function(pinying){
	
		if(app.isBlank(pinying)){
			return '';
		}
		return pinying.substr(0,1).toUpperCase();
	}
}



