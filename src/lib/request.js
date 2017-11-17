'use strict';

const when = require('when');
const logger = require('winston');

/** Request wrapper helps to write controllers more cleanly.
 *
 * f MUST NOT set response status or send a response
 * f MAY do other operations on the response, such as setting headers
 */
module.exports.request = (status, f) => {

  if(!f || typeof f !== 'function') {
    f = status;
    status = 200;
  }
  
  return (req, res, next) => {
    return when.try(f, req.swagger.params, res)
      .tap(r => {

        if(typeof r !== 'string') {
          res.setHeader('Content-Type', 'application/json');
          res.status(status);
          res.end(JSON.stringify(r));
        } else {
          res.status(status);
          res.end(r);
        }
        if(next) next();
      })
      .otherwise(err => {
        var status = err.status || 500;
        if (status >= 500) {
          logger.error('%s', err.stack);
        } else {
          logger.warn('%s: %s', err.name, err.message);
        }

        if (err.status) {
          res.setHeader('Content-Type', 'application/json');
          res.status(status).end(JSON.stringify(err.toResponse()));
        } else {
          res.status(status).end(err.message);
        }

        if(next) next(err);
      });
  };
};
