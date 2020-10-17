// 向服务器端发送请求，索要热门推荐数据
$.ajax({
	type:'get',
	url:'/posts/recommend',
	success:function(response){
		// console.log(response);
		var recommendTpl = `
		{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <img src="{{$value.thumbnail}}" alt="">
			    <span>{{$value.title}}</span>
			  </a>
			</li>
		{{/each}}
		`;
		var html = template.render(recommendTpl,{data:response});
		$('#recommendBox').html(html);
	}
});

// 随机推荐数据
$.ajax({
	type:'get',
	url:'/posts/random',
	success:function(response){
		var randomTpl = `
			{{each data}}
					<li>
					  <a href="detail.html?id={{$value._id}}"">
					    <p class="title">{{$value.title}}</p>
					    <p class="reading">阅读({{$value.meta.views}})</p>
					    <div class="pic">
					      <img src="{{$value.thumbnail}}" alt="">
					    </div>
					  </a>
					</li>
			{{/each}}
		`;
		var html = template.render(randomTpl,{data:response});
		$('#randomBox').html(html);
	}
});

// 最新评论展示
$.ajax({
	type:'get',
	url:'/comments/lasted',
	success:function(response){
		var commentTpl = `
		{{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
		{{/each}}
		`;
		var html = template.render(commentTpl,{data:response});
		$('#commentBox').html(html);
	}
});

// 展示导航栏
$.ajax({
	type:'get',
	url:'/categories',
	success:function(response){
		var navTpl = `
		{{each data}}
			<li><a href="list.html?id={{$value._id}}">
				<i class="fa {{$value.className}}"></i>{{$value.title}}</a>
			</li>
		{{/each}}
		`;
		var html = template.render(navTpl,{data:response})
		$('#navBox').html(html);
		$('#topNavBox').html(html);
	}
});

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

// 搜索功能
$('.search form').on('submit',function(){
	var keys = $(this).find('.keys').val();
	location.href="search.html?key=" + keys;
	return false;
})