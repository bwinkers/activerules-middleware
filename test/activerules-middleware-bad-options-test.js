'use strict;'

var thisDirectory = __dirname;

var options = {
  configRoot: { obj: thisDirectory },
  throw404: true
};

var middleware = require('../')(options), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

describe('ActiveRules Middleware - 404 Enabled', function(){
    
   
    context('If passed an object for the configRoot', function() {
        beforeEach(function(done) {
            /* 
             * before each test, reset the REQUEST and RESPONSE variables 
             * to be send into the middle ware
            **/
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
        
        it('we should get an error', function(done) {
            /*
             * Middleware expects to be passed 3 arguments: request, response, and next.
             * We are going to be manually passing REQUEST and RESPONSE into the middleware
             * and create an function callback for next in which we run our tests
            **/
            middleware(request, response, function next(error) {
                /*
                 * Usually, we do not pass anything into next except for errors, so because
                 * in this test we are passing valid data in REQUEST we should not get an 
                 * error to be passed in.
                **/
                if (!error) { throw new Error('Expected to receive an error'); }

                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context
   
}); // close describe


