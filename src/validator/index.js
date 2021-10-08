/**
 * @description json schema 校验验证
 * @author lqr
 */

const AJV = require('ajv')
const ajv = new AJV()
// const ajv = new AJV({
//     allErrors: true // 输出所有错误
// })


/**
 * @param {object} schema 校验规则
 * @param {object} data 要校验的数据
 */
const _validate = (schema, data = {}) => {
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) {
    return validate.errors
  }
}

module.exports = {
  _validate
}