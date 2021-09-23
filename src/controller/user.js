/**
 * @description user controller
 * @author lqr
 */

const { registerUserNameNotExistError } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { findUserInfo } = require('../services/user')
/**
 * 用户是否存在
 * @param {string} userName 
 */
const isExist = async (userName) => {
  // services
  const userInfo = await findUserInfo(userName)
  console.log('userInfo-',userInfo)
  if (userInfo) {
    return new SuccessModel(userInfo)
  }else{
    return new ErrorModel(registerUserNameNotExistError)
  }
}

module.exports  =  {
  isExist
}