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
    Object.assign(whereOpt, { password: doCrypto(password) })
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

/**
 * 更新用户
 * @param {object} param0 {newNickName, newPicture, newCity,newPassword}
 * @param {object} param1 { userName, password }
 * @returns result => 数组 [1]  1为修改的行数
 */
const updateUser = async (
  { newNickName, newPicture, newCity, newPassword },
  { userName, password }
) => {
  // 更新内容
  const updateDate = {}
  if (newNickName) { updateDate.nickName = newNickName }
  if (newPicture) { updateDate.picture = newPicture }
  if (newCity) { updateDate.city = newCity }
  if (newPassword) { updateDate.password = doCrypto(newPassword) }

  // 查询条件
  const whereConditions = { userName }
  if (password) { whereConditions.password = doCrypto(password) }
  const result = await User.update(updateDate, {
    where: whereConditions
  })

  return result[0] > 0
}
module.exports = {
  getUserInfo,
  createUser,
  updateUser
}