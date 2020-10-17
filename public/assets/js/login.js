// 用户登录
$('#loginBtn').on('click', function() {
	var email = $('#email').val();
	var password = $('#password').val();
	if (email.trim().length == 0) {
		if (password.trim().length == 0) {
			alert('请输入密码和邮箱');
		} else {
			alert('请输入邮箱')
		}
		return;
	};
	if (!email.trim().length == 0) {
		if (password.trim().length == 0) {
			alert('请输入密码');
			return;
		}
	};
	$.ajax({
		type: 'post',
		url: '/login',
		data: {
			email: email,
			password: password
		},
		success: function(response) {
			// console.log(response)
			// 对用户身份进行判断			
			if(response.role == 'admin'){
				// 管理员跳转到数据管理的首页面
				location.href = 'index.html';
			}else{
				// 普通用户跳转到网站首页
				location.href = '../index.html'
			}
			
		},
		error: function() {
			// 登录失败
			alert('用户名或者密码错误')
		}
	})
})
