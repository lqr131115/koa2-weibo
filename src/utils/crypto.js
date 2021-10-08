/**
 * @description 加密
 * @author lqr
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文 
 */
const _md5 = (content) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * @param {string} content 明文
 */
const doCrypto = (content) => {
  const tmp = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(tmp)
}


module.exports = {
  doCrypto
}