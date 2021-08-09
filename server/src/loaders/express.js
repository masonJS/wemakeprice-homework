const express = require('express')
const cors = require('cors')
const routes = require('../routes')
const config = require('../config')

module.exports = ({ app }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(config.api.prefix, routes())

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
}
