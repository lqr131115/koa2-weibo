/**
 * @description user service
 * @author lqr
 */

const { User } = require('../db/model/index')
const { doCrypto } = require('../utils/crypto')
const { formatUser } = require('./_format')

/**
 * 查询用户信息
 * @param {string} userName 
 * @param {string} password 
 */
const getUserInfo = async (userName, password) => {
  // 查询条件
  const whereOpt = { userName }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  return result ? formatUser(result.dataValues) : result
}


/**
 * 新建用户
 * @param {string} userName 用户名 
 * @param {string} password 密码 
 * @param {number} gender 性别 
 * @param {string} nickName 昵称 
 */
const createUser = async ({ userName, password, gender = 3, nickName }) => {
  const result = await User.create({
    userName,
    password: doCrypto(password),
    gender,
    nickName: nickName || userName,
  })
  return result
}

module.exports = {
  getUserInfo,
  createUser
}