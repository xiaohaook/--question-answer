const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tools = require('./tools')
const Zan = {}

const zanSchema = Schema({
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createTime: Date,
    index: String
})

Zan.Model = mongoose.model('zans', zanSchema)

module.exports = Zan
