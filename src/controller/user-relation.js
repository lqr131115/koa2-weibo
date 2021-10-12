/**
 * @description 用户关系 controller
 * @author lqr
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  getUserByFollwerId,
  getUserByUserId,
  createUserRelation,
  deleteUserRelation, } = require('../services/user-relation')
/**
 * 获取粉丝列表
 * @param {number} follwerId 被关注的用户 id
 */
const getFansList = async (follwerId) => {
  const { userList, count } = await getUserByFollwerId(follwerId)
  return new SuccessModel({
    userList,
    count
  })
}

/**
 * 获取关注列表
 * @param {number} userId  当前登录的用户 Id
 */
const getFollwersList = async (userId) => {
  const { userList, count } = await getUserByUserId(userId)
  return new SuccessModel({
    userList,
    count
  })

}

/**
 * 关注
 * @param {number} userId  当前登录的用户 id
 * @param {number} follwerId 被关注的用户 id
 */
const follow = async (userId, follwerId) => {
  try {
    const result = await createUserRelation(userId, follwerId)
    return new SuccessModel(result)
  } catch (error) {
    console.error(error)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {*} userId  当前登录的用户 id 
 * @param {*} follwerId 被关注的用户 id 
 */
const unFollow = async (userId, follwerId) => {
  const result = await deleteUserRelation(userId, follwerId)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFansList,
  getFollwersList,
  follow,
  unFollow
}