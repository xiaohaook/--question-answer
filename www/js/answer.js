$('form').submit(function(ev) {
	ev.preventDefault()
	var text = $('textarea').val().trim()
	console.log(text)
	if(text) {
		$.ajax({
			url: '/api/answer/add',
			data: {text:text},
			type: 'POST',
			dataType: 'json'
		}).done(function(res) {
			alert(res.message)
			if(res.code == 'success') {
				location.href = '/'
			}
		}).fail(function(jqXHR) {
			console.log(arguments)
			console.log(jqXHR.getAllResponseHeaders())
			console.log(jqXHR.getResponseHeader('Content-Type'))
			console.log(jqXHR.responseText)
			alert('网络连接失败，请稍后再试！')
		})
	} else {
		alert('请填写答案！')
	}
})
$('nav>li').removeClass('active')