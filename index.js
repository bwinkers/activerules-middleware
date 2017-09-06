'use strict';

var ar = require('./lib/ar-site.js');

module.exports = function(options) {

  return function activeRules(req, res, next) {

    // Retrieve the site for this hostname
    ar.getSiteByHost(req.headers.host, options)
    .then(function (site) {
      
      res.locals = {};

        // Set the site data in the Express res.locals
        res.locals.site = site;
        
        console.log('ActiveRules initialized site: ' + res.locals.site.site + ' for host: ' + req.headers.host + " from arRoot: " + options);
        
        // Call next middleware
        next();
    })
    .catch(function (err) {
        
        console.log(err.message); 
        
        // Do we want to throw a 404 if we don't find a site?
        if(typeof options.throw404 !== 'undefined' && options.throw404 !== false) {
            // Return a 404
            res.status(404); // HTTP status 404: NotFound
            return next(err);
        } else {
            // Call next middleware
            return next();
        }
    });
  }
};
