/**
 * @description blog-square view router
 * @author lqr
 */

const router = require('koa-router')()
const { getBlogList } = require('../../controller/blog-square')
const { loginRedirect } = require('../../middlewares/loginChecks')
 
// 微博广场
router.get('/square', loginRedirect, async (ctx, next) => {
 
  // 获取微博列表数据
  const result = await getBlogList(0)
  const { count, blogList, pageIndex, pageSize,isEmpty } = result.data   // result 是 SuccessModel 类的实例
 
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    }
  })
})
 
module.exports = router