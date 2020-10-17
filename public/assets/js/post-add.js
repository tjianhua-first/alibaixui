// 文章分类下拉框
$.ajax({
	type:'get',
	url:'/categories',
	success:function(response){
		var html = template('categoryTpl',{data:response});
		$('#category').html(html);
	}
});

// 文章缩略图上传
$('#modifyBox').on('change','#feature', function(){
	// 获取管理元选的文件
	var file = this.files[0];
	// 创建formdata对象 实现二进制文件上传
	var formData = new FormData();
	// 将管理员选择的图片追加到formdata对象中
	formData.append('cover',file);
	// 实现文章封面上传
	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		// jq.ajax会默认把参数转换为url字符串  processData可以让它不要解析
		processData:false,
		// 告诉$.ajax不要设置参数类型
		contentType:false,
		success:function(response){
			console.log(response);
			$('#thumbnail').val(response[0].cover);
		}
	})
});

// 创建文章 表单上传事件
$('#addForm').on('submit', function(){
	var formData = $(this).serialize();
	$.ajax({
		type:'post',
		url:'/posts',
		data:formData,
		success:function(response){
			location.href="posts.html";
		}
	})
	// 阻止表单默认提交
	return false;
	
});

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员在修改文章 展示修改页面
if (id != -1) {
	// 根据id获取文章的详细信息
	$.ajax({
		type:'get',
		url:'/posts/' + id,
		success:function(response){
			$.ajax({
				type:'get',
				url:'/categories',
				success:function(categories){
					response.categories = categories;
					var html = template('modifyTpl',response);
					$('#modifyBox').html(html);
				}
			});
			var html = template('modifyTpl',response);
			$('#modifyBox').html(html);
		}
	})
}
// 从浏览器的地址栏获取查询参数
function getUrlParams(name){
	// location.search 获取查询参数，对其进行截取分割为数组
	var paramsAry = location.search.substr(1).split('&');
	// 循环数组 再进行分割
	for(var i = 0;i < paramsAry.length;i++){
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name){
			return tmp[1]
		}
	}
	return -1;
};

// 修改文章 表单提交
$('#modifyBox').on('submit','#modifyForm', function(){
	var formData = $(this).serialize();
	var id = $(this).attr('data-id')
	$.ajax({
		type:'put',
		url:'/posts/' + id,
		data:formData,
		success:function(){
			location.href = 'posts.html';
		}
	})
	return false;
})