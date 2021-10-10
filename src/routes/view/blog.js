/**
 * @description blog view router
 * @author lqr
 */


const router = require('koa-router')()
const { getBlogList } = require('../../controller/blog-profile')
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index')
})

// 重定向至个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params
  // 获取用户信息
  const userInfo = ctx.session.userInfo

  // 获取微博列表数据
  const result = await getBlogList(curUserName)
  const { count, blogList, pageIndex, pageSize,isEmpty } = result.data   // result 是 SuccessModel 类的实例

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData:{
      userInfo
    }
  })
})

module.exports = router