/**
 * @description user api router
 * @author lqr
 */

const router = require('koa-router')()

router.prefix('/api/user')

router.get('/register',async (ctx,next) => {
  await ctx.render('login')
})
 
router.get('/isExist',async (ctx,next) => {
  const {userName} = ctx.body
  // 逻辑处理
  // service
  // 返回统一格式
})
   
module.exports = router