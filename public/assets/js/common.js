// 退出登录
$('#logout').on('click',function (){
		  var isConfirm = confirm('您确定要退出吗');
		  if(isConfirm) {
			// 用户点击了确定按钮
			$.ajax({
				type:'post',
				url:'/logout',
				success:function(){
					location.href = 'index.html'
				},
				error:function(){
					alert('退出失败')
				}
			})
		  }
	  })
	  
// 展示登录用户信息
$.ajax({
	type:'get',
	url:'/users/' + userId,
	success:function(response){
		if(response.avatar != null){
			$('.profile .avatar').attr('src',response.avatar);
		};
		$('.profile .name').html(response.nickName);
	}
})