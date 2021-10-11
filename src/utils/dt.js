/**
 * @description 时间格式相关工具函数
 * @author lqr
 */

const { format } = require('date-fns')

/**
 * 时间格式化函数
 * @param {string} timeStr 
 */
const timeFormat = (timeStr) => format(new Date(timeStr), 'MM.dd HH:mm')

module.exports = {
  timeFormat
}