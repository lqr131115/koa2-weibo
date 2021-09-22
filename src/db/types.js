/**
 * @description 数据库数据类型
 * @author lqr
 */

const { DataTypes } = require('sequelize')


module.exports = {
  INTEGER: DataTypes.INTEGER,
  STRING: DataTypes.STRING,
  DECIMAL: DataTypes.DECIMAL,
  TEXT: DataTypes.TEXT,
  BOOLEAN: DataTypes.BOOLEAN,
}