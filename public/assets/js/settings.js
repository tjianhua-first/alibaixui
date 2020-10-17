// 上传logo
$('#logo').on('change',function(){
	// 获取logo图片
	var file = this.files[0];
	// 创建formdata对象 实现二进制文件上传
	var formData = new FormData();
	// 追加图片到对象中
	formData.append('logo',file);
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		processData:false,
		contentType:false,
		success:function(response){
			$('#logo').siblings('img').attr('src',response[0].logo)
			$('#hiddenLogo').val(response[0].logo)
		}
	})
});

// 保存网站配置
$('#settingsForm').on('submit',function(){
	var formData = $(this).serialize();
	$.ajax({
		type:'post',
		url:'/settings',
		data:formData,
		success:function(){
			location.reload();
		}
	})
	return false;
})

// 展示网站设置
$.ajax({
	url:'/settings',
	type:'get',
	success:function(response){
		console.log(response)
		if(response){
			// 显示logo
			$('#logo').siblings('img').attr('src',response.logo);
			$('#hiddenLogo').val(response.logo);
			// 显示标题
			$('input[name="title"]').val(response.title);
			// 显示评论判断
			$('input[name="comment"]').prop('checked',response.comment);
			$('input[name="review"]').prop('checked',response.review);
		}
	}
})