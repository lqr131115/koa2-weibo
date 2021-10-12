/**
 * @description 用户关系 service
 * @author lqr
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 根据follwerId获取粉丝用户
 * @param {*} follwerId 被关注者的id
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

  /**
   * userList 
   * [{
      id: 1,
      userName: 'lqr',
      nickName: 'lqr',
      picture: '/1633938591192.01.jpg',
      userRelations: [ [userRelation] ]}]
   */
  let userList = rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return { userList, count }
}

/**
 * 根据userId获取 关注列表
 * @param {*} userId 
 * @returns 
 */
const getUserByUserId = async (userId) => {
  const { rows, count } = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: {
      model: User,
      attributes: ['id', 'userName', 'nickName', 'picture']
    },
    where: {
      userId
    }
  })
  /**
   * userList 
   * [{
      id: 4,
      userId: 2,
      follwerId: 1,
      createdAt: 2021-10-12T06:32:42.000Z,
      updatedAt: 2021-10-12T06:32:42.000Z,
      user: user {
        dataValues: [Object],
        _previousDataValues: [Object],
        _changed: Set(0) {},
        _options: [Object],
        isNewRecord: false
      }
    }]
   */
  let userList = rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })
  return { userList, count }
}

/**
 * 创建用户关系
 * @param {number} userId 关注人的 id 
 * @param {number} follwerId 被关注人的 id
 * @returns 
 */
const createUserRelation = async (userId, follwerId) => {
  const result = await UserRelation.create(
    { userId, follwerId }
  )
  return result.dataValues
}

/**
 * 取消关注 
 * @param {number} userId 关注人的 id 
 * @param {number} follwerId 被关注人的 id
 */
const deleteUserRelation = async (userId, follwerId) => {
  const whereConditions = {
    userId,
    follwerId
  }
  const result = await UserRelation.destroy({
    where: whereConditions
  })
  return result > 0
}

module.exports = {
  getUserByFollwerId,
  getUserByUserId,
  createUserRelation,
  deleteUserRelation
}