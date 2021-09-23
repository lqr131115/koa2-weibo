/**
 * @description user service
 * @author lqr
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 查询用户信息
 * @param {string} userName 
 * @param {string} password 
 */
const findUserInfo = async (userName, password) => {
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


module.exports = {
  findUserInfo
}