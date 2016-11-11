var express = require("express");

var app = express();

app.use(express.static("www"));

var http = require("http");

var server = http.createServer();

var url = require("url");

var WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({server:server});

var wsArray = [];

Array.prototype.removeObject = function(obj){
	var index = this.indexOf(obj);
	this.splice(index,1);
}

function getCurrentTime(){
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	
	h = h<10?"0"+h:h;
	m = m<10?"0"+m:m;
	s = s<10?"0"+s:s;
	
	return h+":"+m+":"+s;
}

setInterval(function(){
	wsArray.forEach(function(tws){
		tws.rc = 0;
	});
},5000);

wss.on("connection",function(ws){
	ws.rc = 0;
	//console.log("有一个客户端连接我了");
	
	//console.log(ws.upgradeReq.headers["sec-websocket-key"]);
	
	ws.on("close",function(){
		console.log(ws.username+"断开连接了");
		
		wsArray.removeObject(ws);
		
		console.log("当前还有"+wsArray.length+"个用户连接");
	});
	
	ws.on("message",function(data,flag){
//		ws.close();
		
		//防止高频率请求
		ws.rc++;
		if(ws.rc>10){
			ws.close();
			return;
		}

//		console.log("收到消息了");
//		console.log(data);
		
		
		var obj = JSON.parse(data);
//		console.log(obj)
		if(obj.type == "username"){
			ws.username = obj.data;
			console.log(ws.username+"连接到服务器");
			wsArray.push(ws);
		}
		
		if(obj.type == "message"){
			console.log(ws.username+"发来了:"+obj.data);
			
			wsArray.forEach(function(tws){
				var resData = {
					username:ws.username,
					photo:obj.photo,
					time:getCurrentTime(),
					msg:obj.data
				}
//				console.log(resData)
				resData=JSON.stringify(resData)
//				tws.send(ws.username+" "+getCurrentTime()+":"+obj.data);
				tws.send(resData)
			});
		}
		
	});
	
});


server.on("request",app);

server.listen(3001,function(){
	console.log("服务器已开启");
});
