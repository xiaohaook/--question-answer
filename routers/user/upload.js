const exp = require('express'),
	multer = require('multer'),
	router = exp.Router(),
	gm = require('gm'),
	db = require('../../db/db')

var urls = filetype=null

const storage = multer.diskStorage({
		destination: 'www/uploads',
		filename: function(req, file, cb) {
			var name = req.cookies.account
			filetype = file.originalname.split('.')
			filetype = filetype[filetype.length - 1]
			urls = 'www/uploads/' + name + '.' + filetype
			cb(null, name + '.' + filetype)
		}
	}),
	uploads = multer({
		storage
	})

router.post('/user/photo', uploads.single('photo'), (req, res) => {
	console.log(req.body)
	console.log(urls)
	if(req.body.x){
		var s = req.body.scale,
		w = req.body.w * s,
		h = req.body.h * s,
		x = req.body.x * s,
		y = req.body.y * s
	gm(urls)
		.crop(w, h, x, y) //剪切，宽,高,x,y
		.write(urls, function(err) {
			if(err) {
				console.log(err)
			} else {
				console.log('处理成功')
			}
		})
	}
    var path='/uploads/' + req.cookies.account+ '.' + filetype
    db.User.Model.update({account:req.cookies.account},{$set:{photo:path}},(err)=>{
    	if(!err){
    		res.redirect('/')
    	} else{
    		console.log('err')
    	}
    })
	
})

router.get('/user/photo',(req, res) => {
	res.render('user/upload',{account:req.cookies.account})
})
module.exports = router

