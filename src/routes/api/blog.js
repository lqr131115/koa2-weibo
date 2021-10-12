/**
 * @description blog api router
 * @author lqr
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { publishBlog } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validator')
const { blogValidate } = require('../../validator/blog')
const { getBlogList } = require('../../controller/blog')
const { genLoadMoreBlogsHtmlStr } = require('../../utils/blog')

const router = require('koa-router')()
router.prefix('/api/blog')

// 发表微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await publishBlog({ userId, content, image })
})

// 微博-加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  const { id } = ctx.session.userInfo
  pageIndex = parseInt(pageIndex)
  const result = await getBlogList(id, pageIndex)
  result.data.blogListTpl = genLoadMoreBlogsHtmlStr(result.data.blogList)
  ctx.body = result
})

module.exports = router