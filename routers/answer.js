const express = require('express')
const router = express.Router()
const db = require('../db/db')
const tools = require('../tools')
// tools.signin拦截请求，检查用户是否登录
router.get('/answer', tools.signin, (req, res) => {
    res.render('answer',{account:req.cookies.account})
})

router.post('/api/answer/add', tools.signin, (req, res) => {
    req.body.createUser = req.cookies.user.id
    req.body.createTime = new Date()
    req.body.ip = tools.formatIP(req.ip)
    req.body.index=req.cookies.index
    var Answer = new db.Answer.Model(req.body)
    Answer.save((err, model) => {
        if(err){
            res.json({code: 'error', message: '服务端错误，请稍后再试！'})
        }
        else{
            res.json({code: 'success', message: '添加成功！'})
//          console.log(req.cookies.index)
//          console.log(model._id)
            db.Question.Model.update({_id:req.cookies.index},{$push:{answers:model._id}}).exec()
        }
    })
    
    
})

router.post('/answer/delete', tools.signin, (req, res) => {
	db.Answer.Model.remove({_id:req.cookies.index},function(err){
		if(err){
            res.json({code: 'error', message: '服务端错误，请稍后再试！'})
        }
        else{
            res.json({code: 'success', message: '删除成功！'})
        }
	})
})

module.exports = router
