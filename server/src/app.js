const express = require('express')
const config = require('./config')
const logger = require('./loaders/logger')
const loader = require('./loaders')

async function startServer(){
  const app = express()

  await loader({ expressApp: app });

  app.listen(config.port, () => {
    logger.info(`Server listening on port: ${config.port}`);
  }).on('error', err => {
    logger.error(err)
    process.exit(1)
  })
}

startServer()
