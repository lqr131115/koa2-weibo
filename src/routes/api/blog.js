/**
 * @description blog api router
 * @author lqr
 */

const { SuccessModel } = require('../../model/ResModel')

const router = require('koa-router')()
router.prefix('/api/blog')

router.get('/create', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id } = userInfo
  ctx.body = new SuccessModel({ title: 'create' })
})

module.exports = router