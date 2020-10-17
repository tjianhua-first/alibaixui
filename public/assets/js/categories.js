// 添加分类
$('#addCategory').on('submit',function(){
	// 获取用户输入的内容并转换为url编码字符串
	var formData = $(this).serialize();
	// 发送请求 添加分类
	$.ajax({
		type:'post',
		url:'/categories',
		data:formData,
		success:function(response){
			location.reload();
		}
	})
	// 阻止默认提交
	return false;
});

// 查询分类列表 显示到页面中
$.ajax({
	type:'get',
	url:'/categories',
	success:function(response){
		// console.log(response);
		// 服务器端返回的数据和模板进行拼接 并显示到页面中
		var html = template('categoryListTpl',{data:response});
		$('#categoryBox').html(html);
	}
});

// 修改分类
// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function(){
	// 获取要修改的分类id
	var id = $(this).attr('data-id');
	// 根据id获取分类数据的详细信息
	$.ajax({
		type:"get",
		url:'/categories/' + id,
		success:function(response){
			// console.log(response);
			var html = template('modifyCategoryTpl',response);
			$('#formBox').html(html);
		}
	})
});
// 分类表单提交
$('#formBox').on('submit', '#modifyCategory', function(){
	// 获取表单输入内容
	var formData = $(this).serialize();
	// 获取id
	var id = $(this).attr('data-id');
	// 发送请求 修改分类数据
	$.ajax({
		type:'put',
		url:'/categories/' + id,
		data:formData,
		success:function(response){
			// console.log(response)
			location.reload();
		}
	});
	// 阻止表单默认提交
	return false;
});

// 删除分类
// 点击删除按钮
$('#categoryBox').on('click','.delete',function(){
	if(confirm('您真的要执行删除操作吗')){
		// 获取id 删除单个用户
		var id = $(this).attr('data-id');
		$.ajax({
			type:'delete',
			url:'/categories/' + id,
			success:function(){
				location.reload();
			}
		})
	}
});