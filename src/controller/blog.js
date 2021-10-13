/**
 * @description blog controller
 * @author lqr
 */

const { PAGE_SIZE, REG_FOR_AR_WHO } = require('../config/constant')
const { createBlogFailInfo } = require('../model/errorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, findAllFollwersBlogs } = require('../services/blog')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relations')

/**
 * 发表微博
 * @param {number} userId 用户Id
 * @param {string} content 微博内容
 * @param {string} image 微博图片
 * @returns 
 */
const publishBlog = async ({ userId, content, image }) => {

  let atUserNameList = []

  // 不替换content内容,只是为了获取内容中的userName
  content = content.replace(
    REG_FOR_AR_WHO,
    (matchStr, nickName, userName) => {
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 去重
  atUserNameList = Array.from(new Set(atUserNameList))
  try {

    // 创建微博
    const blog = await createBlog({ userId, content, image })
    // 根据 @ 用户名查用户信息
    const atUserList = await Promise.all(
      atUserNameList.map(userName => getUserInfo(userName))
    )

    if (atUserList.length > 0) {
      // 创建 @ 关系
      await Promise.all(
        atUserList.map(user => createAtRelation(blog.id, user.id))
      )
    }

    return new SuccessModel(blog)
  } catch (error) {
    console.error(error)
    return new ErrorModel(createBlogFailInfo)
  }
}


/**
 * 获取首页微博(包括自己和关注人的微博)
 * @param {number} userId 当前登录用户的 id 
 * @param {number} pageIndex 列表每页大小
 */
const getBlogList = async (userId, pageIndex = 0) => {
  const { blogList, count } = await findAllFollwersBlogs({ userId, pageIndex, pageSize: PAGE_SIZE })
  return new SuccessModel({
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count,
    isEmpty: blogList.length === 0
  })

}

module.exports = {
  publishBlog,
  getBlogList
}