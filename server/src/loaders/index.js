const expressLoader = require('./express')
const logger = require('./logger')

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp })
  logger.info('Express loaded');
}
