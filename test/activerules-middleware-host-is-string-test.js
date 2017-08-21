
var thisDirectory = __dirname;

var options = thisDirectory;

var middleware = require('../')(options), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

var _ = require('lodash');

describe('Hostname Check', function(){
    
    
    context('If it is NOT a string', function() {
        beforeEach(function(done) {
            /* 
             * before each test, reset the REQUEST and RESPONSE variables 
             * to be send into the middle ware
            **/
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: { test: 'localhost'}
                }
            });
            response = httpMocks.createResponse({
                statusCode: '404'
            });
            
            done(); // call done so that the next test can run
        });
        
        it('we should not get an ActiveRules object', function(done) {
            /*
             * Middleware expects to be passed 3 arguments: request, response, and next.
             * We are going to be manually passing REQUEST and RESPONSE into the middleware
             * and create an function callback for next in which we run our tests
            **/
            middleware(request, response, function next(error) {

                if(error) {
                    done(error);
                } else {
                    if(_.isEmpty(request.ar))
                    {
                        done();
                    } else {
                        err = new Error('ActiveRules object found when none expected');
                        done(err); 
                    }
                }
            }); // close middleware
        })// close it
    }); // close context
    
   
   
}); // close describe


