const dotenv = require('dotenv')
dotenv.config()

module.exports =  {
  port: process.env.PORT || 3000,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api'
  },
  corsUrl: 'http://localhost:8080'
}
