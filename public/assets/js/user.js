// 添加用户
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			alert('用户添加失败')
		}
	})
	// 阻止表单的默认提交行为
	return false;
});
// 当用户选择图片文件时
$('#modifyBox').on('change','#avatar',function(){
	// console.log(this.files[0]);
	var formData = new FormData();
	formData.append('avatar',this.files[0]);
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		// 告诉$.ajax方法不要解析请求参数
		processData:false,
		// gaosu$.ajax方法不要设置请求参数的类型
		contentType:false,
		success:function(response){
			console.log(response);
			// 实现头像预览功能
			$('#preview').attr('src',response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
		}		
	})
});

// 显示用户列表
$.ajax({
	type:'get',
	url:'/users',
	success:function(response){
		// console.log(response);
		// 使用模板引擎拼接用户信息并显示到页面中
		var html = template('userTpl',{data:response});
		$('#userBox').html(html);
	}
});

// 编辑用户
// 事件委托 获取用户信息
$('#userBox').on('click','.edit',function(){
	// 获取被点击用户的id值
	var id = $(this).attr('data-id');
	// 发送请求获取用户信息
	$.ajax({
		type:'get',
		url:'/users/' + id,
		success:function(response){
			var html = template('modifyTpl',response);
			// console.log(html)
			$('#modifyBox').html(html);
		}
	})
});
// 修改用户信息
$('#modifyBox').on('submit', '#modifyForm', function(){
	// 将表单对象转化为url编码字符串
	var formData = $(this).serialize();
	// 获取用户id
	var id = $(this).attr('data-id');
	$.ajax({
		type:'put',
		url:'/users/' + id,
		data:formData,
		success:function(response){
			// 刷新页面
			location.reload();
		},
		error:function(response){
			console.log(response)
		}
	})
	// 阻止表单默认提交
	return false;
});

// 删除单个用户
$('#userBox').on('click','.delete', function(){
	if(confirm('你真的要删除用户吗')){
		// 获取用户id
		var id = $(this).attr('data-id');
		$.ajax({
			type:'delete',
			url:'/users/' + id,
			success:function(){
				location.reload();
			}
		})
	}
});
// 批量删除
// 1 当全选按钮的状态发生改变时
var selectAll = $('#selectAll');
//  获取批量删除按钮
var deleteMany = $('#deleteMany');
selectAll.on('change',function(){
	var status = $(this).prop('checked');
	// 获取所有用户的选择框并设置为和全选一样
	$('#userBox').find('input').prop('checked',status);
	// 根据全选按钮状态显示批量删除按钮
	if(status){
		deleteMany.show();
	}else{
		deleteMany.hide();
	}
	
});
// 2 当用户前面的复选框发生改变时
$('#userBox').on('change', '.userStatus',function(){
	// 获取所有用户 从中过滤出选中的用户，比较选中用户的数量和用户的数量
	var inputs = $('#userBox').find('input');
	if(inputs.length == inputs.filter(':checked').length){
		selectAll.prop('checked', true);
	}else {
		selectAll.prop('checked', false);
	}
	// 用户选中的复选框数量大于0 显示批量删除按钮
	if(inputs.filter(':checked').length > 0){
		deleteMany.show();
	}else{
		deleteMany.hide();
	}
});
// 为批量删除按钮添加点击事件
deleteMany.on('click',function(){
	var ids = [];
	// 获取选中的用户
	var checkedUser = $('#userBox').find('input').filter(':checked');
	// 循环复选框 获取用户id
	checkedUser.each(function(index,ele){
		ids.push($(ele).attr('data-id'));
	});
	if (confirm('您真的要执行批量删除操作吗')){
		$.ajax({
			type:'delete',
			url:'/users/' + ids.join('-'),
			success:function(){
				location.reload();
			}
		});
	};	
});