$('form').submit(function (ev) {
    ev.preventDefault()

    var data = $(this).serialize()

    $.ajax({
        url: '/api/user/signin',
        data: data,
        type: 'POST',
        dataType: 'JSON'
    })
    .done(function (res) {
        alert(res.message)
        if (res.code == 'success') {
            location.href = '/'
        }
    })
    .fail(function(){
        alert('网络连接失败，请稍后再试！')
    })
})
$('nav>li').eq(3).addClass('active')
        .siblings().removeClass('active')