const { Router } = require('express')
const logger = require('../../../loaders/logger')
const homeworkService = require('../../../services/homwork')
const homeworkSchema = require('./schemas')
const { validator, asyncHandler } = require('../../middlewares')
const route = Router()

module.exports = (app) => {
  app.use('/homework', route)

  route.post('/',
    validator(homeworkSchema.POST),
    asyncHandler(async (req, res) => {
      logger.debug('post homework api', req.body)
      const { url, type, amount } = req.body
      const result = await homeworkService.getHomeworkData(url, type, amount)
      return res.json(result).status(200)
  }))
}
