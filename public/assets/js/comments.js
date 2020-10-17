// 向服务器端发送请求 获取评论列表数据
$.ajax({
	type:'get',
	url:'/comments',
	success:function(response){
		var html = template('commentsTpl',response);
		$('#commentsBox').html(html);
		var page = template('pageTpl',response);
		$('#pageBox').html(html);
	}
});

// 实现分页
function changePage(page){
	$.ajax({
		type:'get',
		url:'/comments',
		data:{
			page:page
		},
		success:function(response){
			var html = template('commentsTpl',response);
			$('#commentsBox').html(html);
			var page = template('pageTpl',response);
			$('#pageBox').html(html);
		}
	});
}

// 更改评论状态 
$('#commentsBox').on('click','.status',function(){
	// 获取评论状态
	var status = $(this).attr('data-status');
	var id = $(this).attr('data-id');
	$.ajax({
		type:'put',
		url:'/comments/' + id,
		data:{
			state:status == 0 ? 1 :0
		},
		success:function(){
			location.reload();
		}
	})
})

// 删除评论
$('#commentsBox').on('click','.delete',function(){
	if(confirm('您真的要删除吗')){
		var id = $(this).attr('data-id');
		$.ajax({
			type:'delete',
			url:'/comments/' + id,
			success:function(){
				location.reload();
			}
		})
	}
})