const ENV = process.env.NODE_ENV

module.exports = {
  isPro: ENV === 'prd',
  isDev: ENV === 'dev',
  isTest: ENV === 'test',
  notPro: ENV !== 'prd',
  notDev: ENV !== 'dev',
  notTest: ENV !== 'test',
}