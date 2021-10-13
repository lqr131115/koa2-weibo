/**
 * @description @用户关系 数据模型
 * @author lqr
 */


const seq= require('../seq')
const {INTEGER,BOOLEAN} = require('../types')
const AtRelation = seq.define('atrelation',{
  userId:{
    type:INTEGER,
    allowNull:false,
    comment:'用户 Id'
  },
  blogId:{
    type:INTEGER,
    allowNull:false,
    comment:'微博 Id'
  },
  isRead:{
    type:BOOLEAN,
    allowNull:false,
    defaultValue:false,
    comment:'是否已读'
  }
})

module.exports = AtRelation