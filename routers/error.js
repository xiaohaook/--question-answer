module.exports = function (err, req, res, next){
    if(err) {
    	console.log('未处理的错误：',err)
        res.render('error', err)
    }
    else {
        next()
    }
}