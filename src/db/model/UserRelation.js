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
    comment:'关注者的 id'
  },
  follwerId:{
    type:INTEGER,
    allowNull:false,
    comment:'被关注者的 Id'
  }
})

module.exports = UserRelation