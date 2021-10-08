/**
 * @description user controller
 * @author lqr
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser } = require('../services/user')
/**
 * 用户是否存在
 * @param {string} userName 
 */
const isExist = async (userName) => {
  // services
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 */
const register = async ({ userName, password, gender }) => {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({ userName, password, gender })
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {object} ctx koa2-ctx 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @returns 
 */
const login = async (ctx, userName, password) => {
  const useInfo = await getUserInfo(userName, password)
  if (!useInfo) {
    return new ErrorModel(loginFailInfo)
  }
  console.log('ctx22', ctx.session)
  if (!ctx.session.userInfo) {
    ctx.session.useInfo = useInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
}