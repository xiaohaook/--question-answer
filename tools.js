
exports.formatIP = function (ip) {
    if (ip.startsWith('::1')) {
        return '127.0.0.1'
    }
    if (ip.startsWith('::ffff:')) {
        return ip.substr(7)
    }
    return ip
}

exports.signin = function(req, res, next){
    if(req.cookies.account){
        next()
    }
    else{
        if(req.xhr){
            res.json({
                code:'not signin', 
                message: '登录超时，请重新登录！'
            })
        }
        else{
            res.redirect('/user/signin')
        }
    }
}