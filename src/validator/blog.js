/**
 * @description 微博数据格式校验
 * @author lqr
 */

const { _validate } = require('./index')

const SCHEMA = {
  type: 'object',
  properties: {
    content:{
      type:'string'
    },
    image:{
      type:'string',
      maxLength:255
    }
  }
}
 
const blogValidate = (data = {}) => {
  return _validate(SCHEMA, data)
}
 
module.exports = { blogValidate }