const Joi = require('joi')

const homeworkSchema = {
  POST: Joi.object().keys({
    url: Joi.string().required(),
    type: Joi.string().required(),
    amount: Joi.number().positive().required(),
  })
}

module.exports = homeworkSchema
