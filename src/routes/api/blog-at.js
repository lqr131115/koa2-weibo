/**
 * @description  blog-at @ 我的微博 controller
 * @author lqr
 */

const router = require('koa-router')()
router.prefix('/api/atMe')

const { getAtMeBlogList } = require('../../controller/blog-at')
const { genLoadMoreBlogsHtmlStr } = require('../../utils/blog')
const { loginCheck } = require('../../middlewares/loginChecks')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  const { id } = ctx.session.userInfo
  pageIndex = parseInt(pageIndex)
  const result = await getAtMeBlogList(id, pageIndex)
  result.data.blogListTpl = genLoadMoreBlogsHtmlStr(result.data.blogList)
  ctx.body = result
})

module.exports = router

