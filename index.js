var ar = require('./lib/ar.js');

module.exports = function(options) {

  return function activeRules(req, res, next) {
    // use options to control handler's behavior
    
    ar.getSiteByHost(req.headers.host, options)
    .then(function (site) {
        req.site = site;
        console.log('ActiveRules initialized site: ' + site.site);
        next();
    })
    .catch(function (err) {
        
        console.log(err.message); 
        
        res.status(404) // HTTP status 404: NotFound
        .send('Domain or host support not found');
    });
  }
};
