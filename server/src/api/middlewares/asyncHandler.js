const logger = require('../../loaders/logger')

module.exports =  (execution) => (req, res, next) => {
  execution(req, res, next)
    .catch(e => {
      logger.error(e)
      next(e)
    });
};
