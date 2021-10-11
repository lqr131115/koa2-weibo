/**
 * @description 微博相关的工具函数
 * @author lqr
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()
/**
 * 获取加载更多微博对应的HTML模板
 * @param {Array} blogList 博客列表
 * @param {Boolean} canReply 是否可恢复 
 * @returns 
 */
const genLoadMoreBlogsHtmlStr = (blogList = [], canReply = false) => {
  // 参数命名['blogList','canReply']要和ejs模板中用到的一致
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  genLoadMoreBlogsHtmlStr
}