/**
 * @description @ 用户关系 services
 * @author  lqr
 */

const { PAGE_SIZE } = require('../config/constant')
const { AtRelation, Blog, User } = require('../db/model')
const { formatBlog, formatUser } = require('./_format')

/**
 * 根据用户id 获取@ 自己的微博数量
 * @param {number} userId 用户 id
 */
const findAtMeBlogsCountByUserId = async (userId) => {
  const { count } = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return { count }
}

/**
 * 根据用户id 获取@ 我的微博
 * @param {number} userId 用户 id
 */
const findAtMeBlogs = async (userId, pageIndex = 0, pageSize = PAGE_SIZE) => {
  const { rows, count } = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  let blogList = rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    let user = blog.user
    user = user.dataValues
    blog.user = user
    return blog
  })
  return { blogList, count }
}

/**
 * 更新 @ 我的微博 已读状态
 * @param {number} userId  用户 id
 * @param {number} blogId  微博 id
 */
const updateIsRead = async ({ newIsRead }, { userId, isRead }) => {
  // 拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  // 拼接更新条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }

  // 执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}
module.exports = {
  findAtMeBlogsCountByUserId,
  findAtMeBlogs,
  updateIsRead
}