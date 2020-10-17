$('#modifyForm').on('submit',function(){
	// 获取用户再表单中输入的内容 并转换为url编码字符串
	var formData = $(this).serialize();
	// 发送请求，实现修改
	$.ajax({
		type:'put',
		url:'/users/password',
		data:formData,
		success:function(){
			alert('密码修改成功')
			location.href = 'login.html';
		}
	})
	// 阻止表单默认提交
	return false;
})