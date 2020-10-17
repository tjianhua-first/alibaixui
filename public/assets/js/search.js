// 获取地址栏中的搜索参数
var key = getUrlParams('key');
// 根据搜索关键字 显示搜索结果
$.ajax({
	type:'get',
	url:'/posts/search/' + key,
	success:function(response){
		var html = template('searchTpl',{data:response});
		$('#searchBox').html(html);
		
	}
})