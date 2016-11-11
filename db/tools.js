
exports.toData = function(m) {
    m = m.toObject()
    m.id = m._id.toString()
    delete m._id

    return m
}

exports.toDatas = function(models){
    return models.map(m => exports.toData(m))
}

exports.formatIP = function(ip) {
	// if(ip.startsWith('::1')) {
	// 	return '127.0.0.1'
	// }
	// if(ip.startsWith('::ffff:')) {
	// 	return ip.substr(7)
	// }
	ip.replace(/::1/,'').replace(/::ffff/,'')
	return ip
}