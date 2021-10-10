/**
 * @description 登录验证的中间件
 * @author lqr
 */

const { loginCheckFailInfo } = require('../model/errorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * 登录验证中间件
 * @param {object} ctx 
 * @param {object} next 
 * @returns 
 */
const loginCheck =  async (ctx,next) => {
  if (ctx.session?.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}


/**
 * 登录并重定向中间件
 * @param {object} ctx 
 * @param {object} next 
 * @returns 
 */
const loginRedirect = async (ctx,next) => {
  if (ctx.session?.userInfo) {
    await next()
    return
  }
  // 登录后自动重定向到请求的路由
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}
module.exports = {
  loginCheck,
  loginRedirect
}