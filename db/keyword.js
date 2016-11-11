const mongoose = require('mongoose')
const tools = require('./tools')
const Schema = mongoose.Schema
const Keyword = {}


const keywordSchema = Schema({
    text: { 
        type: String, 
        unique: true 
    },
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createTime: Date,
    ip: String
})


Keyword.Model = mongoose.model('keywords', keywordSchema)


Keyword.Model.on('index', err => {
    if (err) {
        console.error('集合 keywords 索引错误！', err)
    }
    else {
        console.log('集合 keywords 索引成功...')
    }
})


Keyword.list = function () {
    return new Promise(function (resolve, reject) {
        Keyword.Model.find().exec(function (err, models) {
            if (err) {
                reject(err)
            }
            else {
                resolve(tools.toDatas(models))
            }
        })
    })
}


module.exports = Keyword