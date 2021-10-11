/**
 * @description 微博数据缓存
 * @author lqr
 */

const CAHCE_KEY = 'weibo:square'
const { PAGE_SIZE } = require('../config/constant')
const { set, get } = require('./_redis')
const { findBlogs } = require('../services/blog-square')

/**
 * 获取广场博客列表缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 * @returns 
 */
const getSquareBlogsCache = async (pageIndex = 0, pageSize = PAGE_SIZE) => {
  const key = `${CAHCE_KEY}_pageIndex:${pageIndex}_pageSize:${pageSize}`
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    return cacheResult
  }

  const result = await findBlogs({ pageIndex, pageSize })
  await set(key, result, 60)
  return result
}
module.exports = {
  getSquareBlogsCache
}