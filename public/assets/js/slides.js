// 选中图片 上传
$('#file').on('change',function(){
	// 管理员选中的文件
	var file = this.files[0];
	// 创建formData对象实现二进制文件上传
	var formData = new FormData();
	// 将管理员选中的图片添加到formdata对象中
	formData.append('image',file);
	// 发送请求 实现图片上传
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		// 不要处理参数和设置参数类型
		processData:false,
		contentType:false,
		success:function(response){
			$('#image').val(response[0].image);
		}
	})
})

// 添加轮播图
$('#slidesForm').on('submit',function(){
	var formData = $(this).serialize();
	$.ajax({
		type:'post',
		url:'/slides',
		data:formData,
		success:function(){
			location.reload();
		}
	});
	// 阻止表单默认提交行为
	return false;
})

// 获取轮播图列表 展示
$.ajax({
	type:'get',
	url:'/slides',
	success:function(response){
		 var html = template('slidesTpl',{data:response});
		 // console.log(html)
		 $('#slidesBox').html(html);
	}
});

// 删除图片轮播
$('#slidesBox').on('click','.delete',function(){
	if(confirm('您确定要删除图片吗')){
		var id = $(this).attr('data-id');
		console.log(id);
		$.ajax({
			url:'/slides/' + id,
			type:'delete',
			success:function(){
				location.reload();
			}
		})
	}
})