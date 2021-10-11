/**
 * @description 微博-个人主页 api router
 * @author lqr
 */

const { getBlogList } = require('../../controller/blog-square')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genLoadMoreBlogsHtmlStr } = require('../../utils/blog')
const router = require('koa-router')()
router.prefix('/api/square')

// 微博-加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getBlogList(pageIndex)
  result.data.blogListTpl = genLoadMoreBlogsHtmlStr(result.data.blogList)
  ctx.body = result
})

module.exports = router