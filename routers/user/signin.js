const express = require('express')
const db = require('../../db/db')


const router = express.Router()

router.get('/user/signin', (req, res) => {
    res.render('user/signin',{account:req.cookies.account})
})

router.post('/api/user/signin', (req, res) => {

    var filter = {
        account: req.body.account,
        password: req.body.password
    }

    db.User.Model.find(filter)
        .select('account photo createTime ip')
        .exec()
        .then(models => {
            if (models.length > 0) {
                res.cookie('account', req.body.account)
                res.cookie('user', db.toData(models[0]))
                res.json({ code: 'success', message: '登录成功！' })
            }
            else {
                res.json({ code: 'fail', message: '帐号或密码错误！' })
            }
        })
        .catch(err => {
            console.error('查找用户错误：', err)
            res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
        })
})


module.exports = router