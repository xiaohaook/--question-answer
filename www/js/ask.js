function addKeyword() {
	var keyword = prompt('请填写要添加的关键词：', '')
	if(keyword) {
		keyword = keyword.trim()
	}

	if(keyword) {
		$.ajax({
			url: '/api/keyword/add',
			data: {
				text: keyword
			},
			type: 'POST',
			dataType: 'json'
		}).done(function(res) {
			alert(res.message)
			if(res.code == 'success') {
				$('<li>' + keyword + '</li>').appendTo('ul')
//              location.href='/ask'
			}
		}).fail(function() {
			alert('网络连接失败，请稍后再试！')
		})

	}
}

$('nav>li').eq(1).addClass('active')
	.siblings().removeClass('active')

$('form').submit(function(ev) {

	ev.preventDefault()

	var keyword = $('li.selected').first().text()

	if(keyword) {
		var text = $('textarea').val().trim()
		if(text) {
			$.ajax({
				url: '/api/ask/add',
				data: {
					keyword,
					text
				},
				type: 'POST',
				dataType: 'json'
			}).done(function(res) {
				alert(res.message)
				if(res.code == 'success') {
					location.href = '/'
				}
			}).fail(function(jqXHR) {
				alert('网络连接失败，请稍后再试！')
			})
		} else {
			alert('请填写问题！')
		}
	} else {
		alert('请选择一个关键词！')
	}
})

//关键词右键点击删除
$('.answer-keyword').on('mousedown', 'li', function(e) {
	$(this).addClass('selected')
		.siblings().removeClass('selected')
	if(e.which == 3) { //鼠标右键 
		if(confirm('确认删除？')) {
			$.cookie('index', $(this).attr('index'))
//		console.log($.cookie('index'))
			$.post('/keyword/delete', function(res) {
				alert(res.message)
				if(res.code == 'success') {
					$(this).remove()
//				location.href='/ask'
				}
			}.bind(this))
		}
	}

})