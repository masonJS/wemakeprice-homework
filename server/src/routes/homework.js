const { Router } = require('express')
const logger = require('../loaders/logger')
const homeworkService = require('../services/homwork')
const route = Router()

module.exports = (app) => {
  app.use('/homework', route)
  route.post('/', async (req, res, next) => {
    logger.debug('post homework api', req.body)
    try{
      const { url, type, amount } = req.body


      return res.json('status').status(200)
    } catch (e) {
      logger.error(e)
      return next(e)
    }
  })
}
