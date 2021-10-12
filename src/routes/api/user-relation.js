/**
 * @description 用户关系 api router
 * @author lqr
 */

const { follow, unFollow } = require('../../controller/user-relation')
const { loginCheck } = require('../../middlewares/loginChecks')
const router = require('koa-router')()
router.prefix('/api/profile')

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { userId } = ctx.request.body
  const { id } = ctx.session.userInfo
  ctx.body = await follow(id, userId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { userId } = ctx.request.body
  const { id } = ctx.session.userInfo
  ctx.body = await unFollow(id, userId)
})


module.exports = router