'use strict;'

var thisDirectory = __dirname;

var options = thisDirectory;

var middleware = require('../')(options), // the Middleware you want to test
    httpMocks = require('node-mocks-http'), // quickly sets up REQUEST and RESPONSE to be passed into Express Middleware
    request = {}, // define REQUEST
    response = {} // define RESPONSE
;

describe('ActiveRules Middleware - Fail silently', function(){
    
    
    context('If the request was for a valid site', function() {
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
        
        it('then response object should have that site data', function(done) {
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
                if (!response.locals.site) { throw new Error('Expected to find a site'); }
                if (response.locals.site.site != 'example') { throw new Error('Expected site to be "example"'); }
                if (response.locals.site.name != 'Example Site Config') { throw new Error('Expected site to be "Example Site Config"'); }

                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context
    
    context('If the request was for a invalid site', function() {
        beforeEach(function(done) {
            /* 
             * before each test, reset the REQUEST and RESPONSE variables 
             * to be send into the middle ware
            **/
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: 'www.example-of-an-invalid-hostname.com'
                }
            });
            response = httpMocks.createResponse();
            
            done(); // call done so that the next test can run
        });
        
        it('then we should NOT recieve an error', function(done) {
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

                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context
    
    context('If the request provided an object for a hostname', function() {
        beforeEach(function(done) {
            /* 
             * before each test, reset the REQUEST and RESPONSE variables 
             * to be send into the middle ware
            **/
            request = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                headers: {
                    host: {
                      obj: 'www.example.com'
                    }
                }
            });
            response = httpMocks.createResponse();
            
            done(); // call done so that the next test can run
        });
        
        it('things should fail silently', function(done) {
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
                if (error) { throw new Error('Expected to NOT receive an error'); }

                done(); // call done so we can run the next test
            }); // close middleware
        }); // close it
    }); // close context

   
}); // close describe


