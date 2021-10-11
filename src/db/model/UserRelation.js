/**
 * @description user 关系数据模型
 * @author lqr
 */

const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation',{
  userId:{
    type:INTEGER,
    allowNull:false,
    comment:'用户(我的) id'
  },
  follwerId:{
    type:INTEGER,
    allowNull:false,
    comment:'粉丝 Id'
  }
})

module.exports = UserRelation