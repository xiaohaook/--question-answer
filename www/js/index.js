//选择关键词
$('li.selected,li.selected a').click(function(ev){
    ev.preventDefault()
    location.href = '/'
    $(this).css('background-color','red').siblings().css('background-color','')
})

//点击回答
$('.quest-text,.quest-apply').click(function() {
	$.cookie('index', $(this).attr('index'))
	console.log($.cookie('index'))
	location.href = '/answer'
})

//当前标题显示白色
$('nav>li').eq(0).addClass('active')
        .siblings().removeClass('active')

//问题点击删除
$('.quest-delete').click(function(){
	if(confirm('确认删除？')){
		$.cookie('index', $(this).attr('index'))
//		console.log($.cookie('index'))
		$.post('/question/delete',function(res){
			alert(res.message)
			if(res.code=='success'){
				location.href='/'
			}
		})
	}
})

//答案点击删除
$('.answer-delete').click(function(){
	if(confirm('确认删除？')){
		$.cookie('index', $(this).attr('index'))
//		console.log($.cookie('index'))
		$.post('/answer/delete',function(res){
			alert(res.message)
			if(res.code=='success'){
				location.href='/'
			}
		})
	}
})

//点赞
var user=$.cookie('account')
console.log($('span.'+user))
$('.quest-zan').each(function(i,item){
//	console.log(i)
	
	$('span.'+user).each(function(i,ele){
		var ii=$(ele).attr('index')
		if($(item).attr('index')==ii){
		    $(item).toggleClass('zan')
	    }
	})
	
})

$('.quest-zan').click(function(){
	console.log($.cookie('account'))
	var user=$.cookie('account')
	if(user){
		$(this).toggleClass('zan')
		if($(this).hasClass('zan')){
		    $("<span class='"+user+"'>"+user+'</span>').appendTo($(this).parent().next())
		}else{
			$(this).parent().next().find('span.'+user).remove()
		}
		$.cookie('index', $(this).attr('index'))
		$.post('api/zan',function(res){
			console.log(res)
		})
	}
	
})
