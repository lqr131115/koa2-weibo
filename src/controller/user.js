/**
 * @description user controller
 * @author lqr
 */

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser, updateUser } = require('../services/user')
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
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = useInfo
  }
  return new SuccessModel()
}

/**
 * 更改用户信息
 * @param {Object} ctx
 * @param {string} nickName 昵称
 * @param {string} picture 头像
 * @param {string} city 城市
 * @returns 
 */
const changeInfo = async (ctx, { nickName, picture, city }) => {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newPicture: picture,
      newCity: city,
    },
    {
      userName
    })
  if (result) {
    // 更新session中的userInfo
    Object.assign(ctx.session.userInfo, {
      nickName, picture, city
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改用户密码
 * @param {string} userName 昵称
 * @param {string} password 密码
 * @param {string} newPassword 新密码
 * @returns 
 */
const changePassword = async ({ userName, password, newPassword }) => {
  const result = await updateUser(
    { newPassword },
    {
      userName,
      password
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {objec} ctx koa2-ctx 
 */
const logout = async (ctx) => {
  delete ctx.session.userInfo
  return new SuccessModel()
}
module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
}