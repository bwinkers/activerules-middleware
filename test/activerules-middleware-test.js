var middleware = require('../')(__dirname), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

describe('Middleware test', function(){
    context('Valid arguments are passed', function() {
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
        
        it('has no errors', function(done) {
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
                if (error) { throw new Error('Expected not to receive an error'); }
                
                // Other Tests Against request and response
                if (!request.ar.site) { throw new Error('Expected to find a site'); }
                if (request.ar.site.site != 'example') { throw new Error('Expected site to be "example"'); }
                if (request.ar.site.name != 'Example Site Config') { throw new Error('Expected site to be "example"'); }
                
                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context
}); // close describe


