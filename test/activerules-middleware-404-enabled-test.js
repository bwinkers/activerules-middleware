
var thisDirectory = __dirname;

var options = {
    configRoot: thisDirectory,
    throw404: true
};

var middleware = require('../')(options), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

var err = null;

describe('Middleware test w/ 404 enabled', function(){
    
    
    context('Valid Site', function() {
        beforeEach(function(done) {

            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: 'www.example.com'
                }
            });
            response = httpMocks.createResponse();
            
            done(); // call done so that the next test can run
        });
        
        it('has valid ActiveRules Data', function(done) {

            middleware(request, response, function next(error) {

                if (error) { 
                    done(error);
                }

                // Other Tests Against request and response
                if (!request.ar.site || request.ar.site.site != 'example' || request.ar.site.name != 'Example Site Config') { 
                    err = new Error('Incorrect Site data'); 
                    done(err);
                } else {
                    done();
                }
            }); // close middleware
        }); // close it
    }); // close context
    
    
    context('INVALID Site', function() {
        beforeEach(function(done) {

            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: 'www.invalid-example.com'
                }
            });
            response = httpMocks.createResponse({
                headers: {
                    status: '404'
                }
            });
            
            done(); // call done so that the next test can run
        });
        
        it('does not have ActiveRules (ar) defined', function(done) {

            middleware(request, response, function next(error) {

                if (error) { 
                    var n = error.message.startsWith("Cannot find module");
                    
                    if(n) {
                        done();
                    } else {
                        done(error);
                    }
                } else {
                    // Other Tests Against request and response
                    if (response.statusCode != '404') { 
                        err = new Error('Expected 404, got: ' + response.statusCode); 
                        done(err);
                    } else {
                        done();
                    }
                }
            }); // close middleware
        }); // close it
    }); // close context
    
   
}); // close describe


