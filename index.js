'use strict';

var ar = require('./lib/ar-site.js');

module.exports = function(options) {

  return function activeRules(req, res, next) {

    // Retrieve the site for this hostname
    ar.getSiteByHost(req.headers.host, options)
    .then(function (site) {
        // If the request ActiveRules (ar) object is an object, create it.
        if(typeof req.ar != 'object') {
            req.ar = {};
        }
        // Set the site data in the request AR object
        req.ar.site = site;
        
        console.log('ActiveRules initialized site: ' + req.ar.site.site + ' for host: ' + req.headers.host + " from arRoot: " + options);
        
        // Call next middleware
        next();
    })
    .catch(function (err) {
        
        console.log(err.message); 
        
        // Do we want to throw a 404 if we don't find a site?
        if(typeof options.throw404 != 'undefined' && options.throw404 != false) {
            // Return a 404
            res.status(404) // HTTP status 404: NotFound
            .send('Domain or host support not found');
        } else {
            // Call next middleware
            next();
        }
    });
  }
};
