/**
 * @description 用户关系 service
 * @author lqr
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 根据follwerId获取用户
 * @param {*} follwerId 
 */
const getUserByFollwerId = async (follwerId) => {
  const { count, rows } = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: {
      model: UserRelation,
      where: {
        follwerId
      }
    }
  })

  let fansList = rows.map(row => row.dataValues)
  fansList = formatUser(fansList)

  return { fansList, count }
}

module.exports = {
  getUserByFollwerId
}