$('form').submit(function(e) {
	var data = $(this).serialize()
	$.post('/user/photo', data, function(res) {
		console.log(res)
	})
})
var x1 = y1 = x2 = y2 = 0
var maxw = maxh = 0
$('.img-box').mousedown(function(e) {
	//			$('img').css('opacity','0.6')
	e.preventDefault()
		//			console.log(e.pageX + ' ' + e.pageY)
	x1 = e.offsetX
	y1 = e.offsetY
	$('.img-box').mousemove(function(e) {
		x2 = e.offsetX
		y2 = e.offsetY
			//				console.log(e.pageX + ' ' + e.pageY)
		$('.cut').css({
			left: Math.min(x1, x2),
			top: Math.min(y1, y2),
			width: Math.abs(x2 - x1),
			height: Math.abs(y2 - y1)
		})
		$('#x').val(Math.min(x1, x2))
		$('#y').val(Math.min(y1, y2))
		$('#w').val(Math.abs(x2 - x1))
		$('#h').val(Math.abs(y2 - y1))
		$('#scale').val(maxw / 400)
	})
}).mouseup(function(e) {
	$('.img-box').off('mousemove')
		//			$('.cut').mousemove(function(){
		//				
		//			})
}).dblclick(function() {
	$('.cut').css({
			left: 0,
			top: 0,
			width: 0,
			height: 0
		})
		//			$('img').css('opacity','1')
})

$('#photo').change(function() {
	$('.img-box>img').remove()
		//			console.log($(this).get(0).files[0])
	var fs = $(this).get(0).files[0]
	fs = URL.createObjectURL(fs)
		//			console.log(fs)
	$('<img>').attr('src', fs).appendTo('.img-box')
	$('.img-box>img').get(0).onload = function() {
		maxw = $(this).width()
		maxh = $(this).height()
		console.log(maxw + ' ' + maxh)
		$(this).css({
			width: 400
		})
	}
})
$('nav>li').removeClass('active')