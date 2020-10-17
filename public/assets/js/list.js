// 获取地址栏中的id参数
var categoryId = getUrlParams('id');
// 根据分类id获取文章列表
$.ajax({
	type:'get',
	url:'/posts/category/' + categoryId,
	success:function(response){
		var html = template('listTpl',{data:response});
		$('#listBox').html(html);
		// 展示页面分类标题
		var title = response[0].category.title;
		console.log(title);
		$('#listBox').siblings('h3').html(title);
	}
});
// 根据id获取分类信息
// $.ajax({
// 	type:'get',
// 	url:'/categories/' + categoryId,
// 	success:function(response){
// 		$('#listBox').siblings('h3').html(response.title)
// 	}
// })