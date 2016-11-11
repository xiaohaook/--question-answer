const express = require('express')
const db = require('../../db/db')
const tools = require('../../tools')


const router = express.Router()

router.get('/user/register', (req, res) => {
    res.render('user/register',{account:req.cookies.account})
})

router.post('/api/user/register', (req, res) => {
    var user = new db.User.Model({
        account: req.body.account,
        password: req.body.password,
        createTime: new Date(),
        ip: tools.formatIP(req.ip),
        photo: '/defaultPic/defaultPic.gif'
    })
        .save()
        .then(() => {
            res.json({ code: 'success', message: '注册成功！' })
        })
        .catch(err => {
            if (db.isDuplicateIndexError(err)) {
                res.json({ code: 'fail', message: '帐号已注册！' })
            }
            else {
                console.error('注册用户错误！', err)
                res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
            }
        })

})


module.exports = router