const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tools = require('./tools')
const Answer = {}

const answerSchema = Schema({
    text: String,
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createTime: Date,
    ip: String,
    index: String
})

Answer.Model = mongoose.model('answers', answerSchema)


module.exports = Answer
