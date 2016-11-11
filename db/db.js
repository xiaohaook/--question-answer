const mongoose = require('mongoose')
const tools = require('./tools')


// ----设置Promise-------------------------------------------


mongoose.Promise = global.Promise


// ----数据模型------------------------------------------------


exports.User = require('./user')
exports.Keyword = require('./keyword')
exports.Question = require('./question')
exports.Answer = require('./answer')
exports.Zan = require('./zan')

exports.toData = tools.toData
exports.toDatas = tools.toDatas


// ----数据库-------------------------------------------------


exports.isDuplicateIndexError = function (err) {
    return err.name && err.name == 'MongoError' && err.code == 11000
}

// ----连接数据库-----------------------------------------------


mongoose.connect('mongodb://127.0.0.1/zyqa')
mongoose.connection.on('connected', () => console.log('数据库连接成功...'))


