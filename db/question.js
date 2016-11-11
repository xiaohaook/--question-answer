const mongoose = require('mongoose')
const tools = require('./tools')
const Schema = mongoose.Schema
const Question = {}


const questionSchema = Schema({
    text: String,
    keyword: String,
    createUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createTime: Date,
    ip: String,
    answers:[{type: 'ObjectId',
        ref: 'answers'}],
    zan:[{type: 'ObjectId',
        ref: 'zans'}]
})


Question.Model = mongoose.model('questions', questionSchema)


Question.listByPager = function (keyword, pageNow, pageCount) {   //参数默认值，没有传递则为默认
    if (pageNow < 1) throw new RangeError('参数 pageNow 不应小于 1。')
    if (pageCount < 1) throw new RangeError('参数 pageCount 不应小于 1。')  //抛出错误后，跳到错误处理页面，不往下进行

    var filter = {}
    if(keyword) filter.keyword = keyword
//  console.log(filter)
    return new Promise(function (resolve, reject) {
        Question.Model.find(filter)
            .sort('-createTime')
            .skip((pageNow - 1) * pageCount)  //跳过多少页
            .limit(pageCount)  //显示多少页
            .populate({
                path: 'createUser',
                select: '-password'
            })
            .populate({
            	path:'answers',
            	populate: { 
            		path: 'createUser',
                    select: '-password' }
            })
            .populate({
            	path:'zan',
            	populate: { 
            		path: 'createUser',
                    select: '-password' }
            })
            .exec((err, models) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(tools.toDatas(models))
                }
            })
    })
}


module.exports = Question
