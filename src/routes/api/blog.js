/**
 * @description blog api router
 * @author lqr
 */

const { loginCheck } = require('../../middlewares/loginChecks')
const { publishBlog } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validator')
const { blogValidate } = require('../../validator/blog')
const router = require('koa-router')()
router.prefix('/api/blog')

// 发表微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await publishBlog({ userId, content, image })
})

module.exports = router