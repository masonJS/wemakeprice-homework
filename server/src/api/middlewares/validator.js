const logger = require('../../loaders/logger')

module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { convert: false });
    const valid = error == null;

    if(valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      logger.error(message)
      res.status(400).json({ error: message })
    }
  }
};
