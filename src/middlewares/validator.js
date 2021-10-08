/**
 * @description 信息校验中间件
 * @author lqr
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFailInfo } = require('../model/errorInfo')

/**
 * 生成json schema 验证的中间件
 * @param {function} validateFun 
 * @returns 
 */
const genValidator = (validateFun) => {
  // 定义中间件
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFun(data)
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }
    await next()
  }

  return validator
}

module.exports = {
  genValidator
}
