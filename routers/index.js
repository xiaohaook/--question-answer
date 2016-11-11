const express = require('express')
const db = require('../db/db')
const tools = require('../tools')

var pageCount = 4

const router = express.Router()


router.get(['/', '/k-:keyword([A-Za-z0-9]{2,20})'], (req, res) => { //加个:,变成一个参数
	//	console.log(req.params.keyword)
	//  console.log(req.query.page)
	var pageNow = req.query.page || 1
	pageNow=Number(pageNow)
	var keyword=req.params.keyword
    var filter = {}
    if(keyword) filter.keyword = keyword
	db.Question.Model.find(filter).count().exec((err, count) => {
//		console.log(count)
		var pageNum = Math.ceil(count / pageCount)
//		console.log(pageNum)
		var pages=[]
		for(var i=1; i<=pageNum; i++){
			pages.push(i)
		}
//		console.log(pages)
		const q = db.Question.listByPager(keyword, pageNow, pageCount)
		const k = db.Keyword.list()
		Promise.all([q, k])
			.then(function([q,k]) {
//				console.log(datas[0][0])
				res.render('index', {
					keyword: req.params.keyword,
					account: req.cookies.account,
					keywords: k,
					questions: q,
					pageCount,
					pages,
					pageNow,
					pageNum
				})
			})
			.catch(err => {
				console.error('获取 questions 或 keywords 错误：', err)
				res.render('error', err)
			})
	})

})

router.get('/ws',tools.signin,function(req,res){
    res.cookie('photo',req.cookies.user.photo)
	res.render('ws',{account: req.cookies.account})
})
module.exports = router
