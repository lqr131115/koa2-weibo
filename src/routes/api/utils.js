/**
 * @description utils api router
 * @author lqr
 */

const router = require('koa-router')()
router.prefix('/api/utils')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
const { loginCheck } = require('../../middlewares/loginChecks')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { name, type, size, path } = file
  ctx.body = await saveFile({
    name, type, size,
    filePath: path
  })
})

module.exports = router