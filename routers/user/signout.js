const express = require('express')
const router = express.Router()


router.get('/user/signout', (req, res) =>{
    res.clearCookie('account')
    res.redirect('/')
})


module.exports = router