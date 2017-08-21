
var thisDirectory = __dirname;

var options = thisDirectory;

var middleware = require('../')(options), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

describe('Middleware test w/ invalid hostname', function(){
    
    
    context('Hostname is an object', function() {
        beforeEach(function(done) {
            /* 
             * before each test, reset the REQUEST and RESPONSE variables 
             * to be send into the middle ware
            **/
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: {what:'www.example.com'}
                }
            });
            response = httpMocks.createResponse({
                statusCode: '404'
            });
            
            done(); // call done so that the next test can run
        });
        
        it('it fails', function(done) {
            /*
             * Middleware expects to be passed 3 arguments: request, response, and next.
             * We are going to be manually passing REQUEST and RESPONSE into the middleware
             * and create an function callback for next in which we run our tests
            **/
            middleware(request, response, function next(error) {


                done(); // call done so we can run the next test
            }); // close middleware
        })// close it
    }); // close context
    
   
   
}); // close describe


