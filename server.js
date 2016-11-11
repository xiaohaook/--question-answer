const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const template = require('./template')


const app = express()


// 设置视图引擎
app.engine('.html', template.__express)
app.set('view engine', 'html')


// 处理静态资源请求
app.use(express.static('www'))


// 提取请求数据
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())


// 处理页面请求
app.use(require('./routers/index'))
app.use(require('./routers/ask'))
app.use(require('./routers/user/signin'))
app.use(require('./routers/user/register'))
app.use(require('./routers/user/signout'))
app.use(require('./routers/answer'))
app.use(require('./routers/zan'))
app.use(require('./routers/user/upload'))
// 错误处理
app.use(require('./routers/404'))
app.use(require('./routers/error')) //处理所有的请求处理错误

// 监听端口
app.listen(3000, err => console.log('正在运行...'))