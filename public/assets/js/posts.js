// 将文章列表显示出来
	$.ajax({
		type:'get',
		url:'/posts',
		success:function(response){
			console.log(response)
			var html = template('postsTpl',{data:response});
			$('#postsBox').html(html);
			var page = template('pageTpl',response);
			$('#page').html(page);
		}
	});
// 日期处理函数
function formateDate(date){
	// 将日期字符串转换为日期对象
	date = new Date(date);
	return date.getFullYear() + '-' (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours();
}
// 分页
function changePage(page){
	// 将文章列表显示出来
	$.ajax({
		type:'get',
		url:'/posts',
		data:{
			page:page
		},
		success:function(response){
			console.log(response)
			var html = template('postsTpl',{data:response});
			$('#postsBox').html(html);
			var page = template('pageTpl',response);
			$('#page').html(page);
		}
	})
};

// 分类下拉框
$.ajax({
	type:'get',
	url:'/categories',
	success:function(response){
		var html = template('categoryTpl',{data:response});
		$('#categoryBox').html(html);
	}
});
// 根据分类筛选文章
$('#filterForm').on('submit', function(){
	var formData = $(this).serialize();
	$.ajax({
		type:'get',
		url:'/posts',
		data:formData,
		success:function(response){
			console.log(response)
			var html = template('postsTpl',{data:response});
			$('#postsBox').html(html);
			var page = template('pageTpl',response);
			$('#page').html(page);
		}
	})
	// 阻止表单默认提交
	return false;
});

// 删除文章
$('#postsBox').on('click','.delete',function(){
	if(confirm('您真的要执行删除操作吗')){
		var id = $(this).attr('data-id');
		$.ajax({
			type:'delete',
			url:'/posts/' + id,
			success:function(){
				location.reload();
			}
		})
	}	
});