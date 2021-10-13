/**
 * @description blog view router
 * @author lqr
 */

const router = require('koa-router')()
const { getBlogList: getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogList: getSquareBlogList } = require('../../controller/blog-square')
const { getBlogList: getHomeBlogList } = require('../../controller/blog')
const { getAtMeBlogList, markAsRead } = require('../../controller/blog-at')
const { getFansList, getFollwersList } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')
const { getAtMeCount } = require('../../controller/blog-at')
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {

  let myUserInfo = ctx.session.userInfo
  const { id } = myUserInfo

  // 微博列表数据
  const result = await getHomeBlogList(id)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  // 粉丝列表
  const { data: fansData } = await getFansList(id)

  // 关注列表
  const { data: followersData } = await getFollwersList(id)

  // @ 我的数量 
  const { data: atMeCountData } = await getAtMeCount(id)

  await ctx.render('index', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: myUserInfo,
      atCount: atMeCountData.count,
      fansData: {
        count: fansData.count,
        list: fansData.userList,
      },
      followersData: {
        count: followersData.count,
        list: followersData.userList
      }
    }
  })
})

// 重定向至个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

  // 当前主页用用户的用户名
  const { userName } = ctx.params

  // 登录的用户信息
  let myUserInfo = ctx.session.userInfo
  const { userName: myUserName } = myUserInfo

  // 是否是自己的个人空间
  const isMe = (userName === myUserName)

  let curUserInfo
  if (isMe) {
    curUserInfo = myUserInfo
  } else {
    const result = await isExist(userName)
    if (result.errno !== 0) {
      return
    }
    curUserInfo = result.data
  }

  const { id: curUserId, userName: curUserName } = curUserInfo

  // 微博列表数据
  const result = await getProfileBlogList(curUserName)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  // 粉丝列表
  const { data: fansData } = await getFansList(curUserId)

  // 关注列表
  const { data: followersData } = await getFollwersList(curUserId)

  // 是否被自己关注
  const amIFollowed = fansData.userList.some(fan => fan.userName === myUserName)

  // @ 我的数量 
  const { data: atMeCountData } = await getAtMeCount(curUserId)

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      amIFollowed,
      atCount: atMeCountData.count,
      fansData: {
        count: fansData.count,
        list: fansData.userList,
      },
      followersData: {
        count: followersData.count,
        list: followersData.userList
      }
    }
  })
})

// 微博广场
router.get('/square', loginRedirect, async (ctx, next) => {

  // 获取微博列表数据
  const result = await getSquareBlogList(0)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

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

// @ 我的
router.get('/at-me', loginRedirect, async (ctx, next) => {

  let { id } = ctx.session.userInfo

  // 微博列表数据
  const result = await getAtMeBlogList(id)
  const { count, blogList, pageIndex, pageSize, isEmpty } = result.data   // result 是 SuccessModel 类的实例

  // @ 我的数量 
  const { data: atMeCountData } = await getAtMeCount(id)

  await ctx.render('atMe', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    atCount: atMeCountData.count,
  })

  // 标记已读
  if (atMeCountData.count > 0) {
    await markAsRead(id)
  }

})

module.exports = router