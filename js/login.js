window.formValidate={
	
	validateLogin:function(username,txt_password){
		if(username.value.length>12){
			app.showToast("用户名长度不能大于12","error");
			return false;
		}
		if(txt_password.value.length>12){
			app.showToast("密码长度不能大于12","error");
			return false;
		}
	}
}
