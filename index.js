'use strict';

var ar = require('./lib/ar-site.js');

module.exports = function(options) {

  return function activeRules(req, res, next) {
    // use options to control handler's behavior
    
    ar.getSiteByHost(req.headers.host, options)
    .then(function (site) {
        req.ar = {};
        req.ar.site = site;
        console.log('ActiveRules initialized site: ' + req.ar.site.site + ' for host: ' + req.headers.host + " from arRoot: " + options);
        next();
    })
    .catch(function (err) {
        
        console.log(err.message); 
        
        res.status(404) // HTTP status 404: NotFound
        .send('Domain or host support not found');
    });
  }
};
