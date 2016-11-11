# ZYQA
----------------------------
通过问答来总结知识点

## 运行测试指南
- 本项目是 Node.js 项目，请先使用命令安装本项目依赖的模块包：
```
npm i
```
- 本项目使用了 MongoDB 数据库，请先安装 MongoDB 并将其配置成系统服务
- 可使用以下命令启动运行：
```
node server 
```
或
```
npm test
```

## 常见问题解决办法
- Template Error
通常是因为本地数据库的集合缺少某些属性。通过 *mongo* 客户端清空集合中的数据即可，如：
```
db.questions.remove({})
```
##聊天
-需要将ws-server启动，node ws-server
-再就是将www/js文件夹里的soc = new WebSocket("ws://192.168.14.130:3001");处的ip地址改成你电脑的ip
-运行前最好清空你的questions，db.questions.remove({})

