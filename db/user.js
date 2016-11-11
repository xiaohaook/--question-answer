const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = {}

const userSchema = Schema({
    account: { 
        type: String, 
        unique: true 
    },
    password: String,
    photo: String,
    createTime: Date,
    ip: String,
})


User.Model = mongoose.model('users', userSchema)


User.Model.on('index', err => {
    if (err) {
        console.error('集合 keywords 索引错误！', err)
    }
    else {
        console.log('集合 users 索引成功...')
    }
})


module.exports = User