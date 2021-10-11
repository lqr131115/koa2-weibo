/**
 * @description 微博-个人主页 api router
 * @author lqr
 */

const router = require('koa-router')()
router.prefix('/api/profile')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogList } = require('../../controller/blog-profile')
const { genLoadMoreBlogsHtmlStr } = require('../../utils/blog')

// 微博-加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getBlogList(userName, pageIndex)
  result.data.blogListTpl = genLoadMoreBlogsHtmlStr(result.data.blogList)
  ctx.body = result
})

module.exports = router