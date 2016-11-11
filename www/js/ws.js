var soc;

var chatBox = document.getElementById("chatBox");
var msgBox = document.getElementById("msgBox");

var username = $.cookie('account');
console.log(username)

//WebSocket是实现客户端和服务器双工通信的技术（服务器可以
//主动给客户端发送消息），是一种长连接。
//通过 new创建WebSocket对象时需要指定连接地址url，创建成功
//后对象就会自动进行连接，并根据连接的结果触发相应的事件.
console.log($.cookie('ip'))
soc = new WebSocket("ws://localhost:3001");

soc.onopen = function() {
	var username = $.cookie('account');
	console.log("连接成功");

	//连接成功后，把昵称发给服务器
	var msg = {
		type: "username",
		data: username

	}
	msg = JSON.stringify(msg);
	soc.send(msg);
	var mess=sessionStorage.getItem('mess')
//	sessionStorage.clear()
//	console.log(mess)
//	console.log(sessionStorage)
	$('#chatBox').html(mess)
	chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
}

soc.onerror = function() {
	console.log("连接失败");
}

console.log($.cookie('photo'))
soc.onmessage = function(e) {
	//				console.log("得到数据了");
//	console.log(e.data);
	var data = JSON.parse(e.data)
//	console.log(data)
	$("<p class='" + data.username + "'></p>").appendTo('#chatBox')
		.append('<img src="'+data.photo+'">'+data.msg)
//		.append('<br>' + data.username + ' ' + data.time)
		.css({'padding': '0 40px','word-break': 'break-all','clear':'both','position':'relative'})
		.find('img').css({width:30,height:30,'border-radius':'50%','position':'relative',left:-30})

	$('.' + username).css({'float':'right','clear':'both'}).find('img')
	.css({'float':'right','clear':'both',left:30})

	chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    sessionStorage.setItem('mess',$("#chatBox").html())
}

function sendMessage() {

	if(!username) {
		alert("您还没有登录");
		return;
	}

	//soc.send("来自客户端的问候");
	var text = msgBox.value;
	if(!text.trim()) {
		alert("不能发送空消息");
		return;
	}

	var msg = {
		type: "message",
		data: text,
		photo:$.cookie('photo')
	}

	msg = JSON.stringify(msg);

	soc.send(msg);

	msgBox.value = "";

}

msgBox.onkeydown = function(e) {
	if(e.keyCode == 13) {
		sendMessage();
	}
}

//当前标题显示白色
$('nav>li').eq(3).addClass('active')
	.siblings().removeClass('active')
