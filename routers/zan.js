const express = require('express')
const router = express.Router()
const db = require('../db/db')
const tools = require('../tools')
	// tools.signin拦截请求，检查用户是否登录

router.post('/api/zan', tools.signin, (req, res) => {
	db.Zan.Model.count({
		createUser: req.cookies.user.id,
		index:req.cookies.index
	}).exec((err, i) => {
//		console.log(i)
		if(i == 0) {
			req.body.createUser = req.cookies.user.id
			req.body.createTime = new Date()
			req.body.index = req.cookies.index
			var Zan = new db.Zan.Model(req.body)
			Zan.save((err, model) => {
				if(err) {
					res.json({
						code: 'error',
						message: '服务端错误，请稍后再试！'
					})
				} else {
					console.log(req.cookies.index)
					console.log(model._id)
					db.Question.Model.update({_id:req.cookies.index},{$push:{zan:model._id}}).exec()
					res.json({
						code: 'success',
						message: '赞成功！'
					})
				}
			})
		}else{
			db.Zan.Model.remove({createUser: req.cookies.user.id,index:req.cookies.index}).exec()
		}
	})

})

module.exports = router