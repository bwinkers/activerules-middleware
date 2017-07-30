'use strict'

var _ = require("lodash");

var AR = function () {};

AR.prototype.getSiteByHost = function (hostname, configRoot) {
    return new Promise(
        function (resolve, reject) {
            try {
                if(typeof hostname === 'string') {
                  console.log('Getting site for hostname: '+hostname);
                  loadHostConfig(hostname, configRoot)
                  .then(function (host) {
                        loadConfig('site', host.site, configRoot)
                        .then(function (site) {
                            _.merge(site, host);
                            resolve(site);
                        })
                        .catch(function (err) {
                            reject(err);
                        });
                  })
                  .catch(function (err) {
                        reject(err);
                  });

                } else {
                    throw new Error("Invalid hostname: " + hostname);
                }
            } 
            catch(err) {
                reject(err);
            }
      }
    );
};

function loadHostConfig(hostname, configRoot) {

    return new Promise(
        function (resolve, reject) {
            try {
                getRootDomain(hostname)
                .then(function(domain){
                    console.log('Loading root domain: '+domain);
                    loadConfig('host', domain, configRoot)
                    .then(function(hostConfig){
                       // console.log(hostConfig);
                       resolve(hostConfig);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
                })
                .catch(function (err) {
                    reject(err);
                });
            }
            catch(err) {
                reject(err);
            }
        }
    );  
}

function getRootDomain(hostname) {

    return new Promise(
      function (resolve, reject) {
            try {
                if(typeof hostname === 'string') {
                    // Get the root domain to look for site support
                    // @TODO account for multiple sites under different subdomains of the same root domain.
                    var hostPort = hostname.split(':');
                    var hostOnly = hostPort[0];
                    var hostParts = hostOnly.split('.');
                    var countParts = hostParts.length;
                    var domain = false;

                    //extracting the root domain here
                    if (countParts > 2) {
                        domain = hostParts[countParts - 2] + '.' + hostParts[countParts - 1];
                        resolve(domain);
                    } else {
                        throw new Error("Invalid hostname format: " + hostname);
                    }
                } else {
                    throw new Error("Invalid hostname: " + hostname);
                }
            }
            catch(err) {
                reject(err);
            }
      }
    );  
}

function loadConfig(type, value, configRoot) {

    return new Promise(
      function (resolve, reject) {
            try {

                var config = require(configRoot + "/config/" + type + "/" + value + ".json");

                resolve(config);
            }
            catch(err) {

                reject(err);
            }
      }
    );  
}


module.exports = exports = new AR();