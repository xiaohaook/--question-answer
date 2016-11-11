const express = require('express')
const db = require('../db/db')
const tools = require('../tools')


const router = express.Router()


router.get('/ask', tools.signin, (req, res) => {
    db.Keyword.list()
        .then(keywords => {
            res.render('ask', { keywords,account:req.cookies.account})
        })
        .catch(err => {
            console.error('获取 keywords 错误：', err)
            res.render('error', err)
        })
})


router.post('/api/keyword/add', tools.signin, (req, res) => {
    new db.Keyword.Model({
        text: req.body.text,
        createUser: req.cookies.user.id,
        createTime: new Date(),
        ip: tools.formatIP(req.ip)
    })
        .save()
        .then(() => {
            res.json({ code: 'success', message: '添加成功！' })
        })
        .catch(err => {
            if (db.isDuplicateIndexError(err)) {
                res.json({ code: 'fail', message: '关键词重复！' })
            }
            else {
                console.error('保存 keyword 错误：', err)
                res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
            }
        })
})


router.post('/api/ask/add', tools.signin, (req, res) => {
    new db.Question.Model({
        text: req.body.text,
        keyword: req.body.keyword,
        createUser: req.cookies.user.id,
        createTime: new Date(),
        ip: tools.formatIP(req.ip)       
    })
        .save()
        .then(() => {
            res.json({ code: 'success', message: '添加成功！' })
        })
        .catch(err => {
            console.log('保存 question 错误：', err)
            res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
        })
})


router.post('/question/delete', tools.signin, (req, res) => {
	db.Question.Model.remove({_id:req.cookies.index},function(err){
		if(err){
            res.json({code: 'error', message: '服务端错误，请稍后再试！'})
        }
        else{
            res.json({code: 'success', message: '删除成功！'})
        }
	})
})

router.post('/keyword/delete', tools.signin, (req, res) => {
	db.Keyword.Model.remove({_id:req.cookies.index},function(err){
		if(err){
            res.json({code: 'error', message: '服务端错误，请稍后再试！'})
        }
        else{
            res.json({code: 'success', message: '删除成功！'})
        }
	})
})
module.exports = router
