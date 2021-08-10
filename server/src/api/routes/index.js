const { Router } = require('express')
const homework = require('./homework')

module.exports = () => {
  const app = Router()
  homework(app)
  return app
}
