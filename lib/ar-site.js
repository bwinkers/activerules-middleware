'use strict'

var _ = require("lodash");

var Promise = require("bluebird");

var AR = function () {};

AR.prototype.getSiteByHost = function (hostname, options) {
    
    var configRoot = '';
    
    return new Promise(
        function (resolve, reject) {
            try {
                
                if(typeof options === 'string') {
                    configRoot = options;
                } else {
                    if(typeof options.configRoot === 'string') {
                        configRoot = options.configRoot;
                    } else {
                        throw new Error("No configRoot provided.")
                    }
                }

                if(typeof hostname === 'string') {
                    console.log('Getting site for hostname: '+hostname);
                    loadHostConfig(hostname, configRoot)
                    .then(function (host) {
                        console.log('Loading Site from ' + configRoot + '/site/' + host.site + '/config.json');
                        return loadConfig(configRoot, '/site/' + host.site + '/config.json')
                        .then(function (site) {

                            _.merge(site, host);
                            resolve(site);
                        })
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
            getRootDomain(hostname)
            .then(function(domain){
                console.log('Loading root domain: '+ domain + ' trying: '+ configRoot + '/host/' + domain + '.json');
                return loadConfig(configRoot, '/host/' + domain + '.json')
                .then(function(hostConfig){
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
    );  
}

function getRootDomain(hostname) {

    return new Promise(
        function (resolve, reject) {
            try {

                // Get the root domain to look for site support
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
            }
            catch(err) {
                reject(err);
            }
        }
    );  
}

function loadConfig(configRoot, file) {

    // the config object
    var config = {}; 
    
    return new Promise(
        function (resolve, reject) {
            try {
                // eslint-disable-line global-require
                config = require(configRoot + file);

                resolve(config);
            }
            catch(err) {

                reject(err);
            }
        }
    );  
}


module.exports = exports = new AR();