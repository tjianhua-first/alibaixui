// 从地址栏获取文章id
var postId= getUrlParams('id');
// 根据文章id获取文章详细信息
$.ajax({
	type:'get',
	url:'/posts/' + postId,
	success:function(response){
		var html = template('postTpl',response);
		$('#postBox').html(html)
	}
});

// 执行点赞操作
$('#postBox').on('click','#like',function(){
	$.ajax({
		type:'post',
		url:'/posts/fabulous/' +postId,
		success:function(){
			location.reload();
		}
	})
});

// 评论是否审核变量
var review = '';
// 获取网站配置信息
$.ajax({
	type:'get',
	url:'/settings',
	success:function(response){
		console.log(response);
		review = response.review;
		// 判断管理员是否开启的评论模板
		if(response.comment){
			// 如果开启 渲染评论模板
			var html = template('commentTpl');
			$('#comment').html(html)
		}
	}
});

// 
$('#comment').on('submit','form',function(){
	// 获取评论内容
	var content = $(this).find('textarea').val();
	// 设置评论状态
	var state;
	review ? state = 0 : state = 1;
	// 创建评论
	$.ajax({
		type:'post',
		url:'/comments',
		data:{
			content:content,
			state:state,
			post:postId
		},
		success:function(){
			location.reload();
		},
		error:function(err){
			console.log(err);
			if(confirm('请登录在评论')){
				location.href = 'admin/login.html';
			}
		}
	})
	return false;
});
