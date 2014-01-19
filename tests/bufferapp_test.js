var libpath = process.env['NODE_BUFFERAPP_COV'] ? '../lib-cov' : '../lib';
var BufferApp = require(libpath)
, config = require('./config')
, assert = require('assert');

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

describe('BufferApp', function() {
  this.timeout(10000);
  describe(':Constructor', function() {
  	it(':Should return a BufferApp object whose OAuth parameters are set', function() {
  		bufferapp = new BufferApp(config);
  	});
  });

  describe(':Login', function() {
  	it(':Should authenticate a user and return a BufferUser object.', function(done) {
  	  	this.timeout(0);
  	    http = require('http');
  	    var url = require("url");
  		http.createServer(function(req, res) {
  			if (req.url == '/index.html' || req.url == '/') {
  				res.statusCode = 302;
				res.setHeader("Location", bufferapp.getAuthorizationURI());
				res.end();
  			};
  			if (req.url.indexOf('/callback') !== -1) {
  				var parsedUrl = url.parse(req.url, true); // true to get query as object
  				bufferapp.login(parsedUrl.query.code, function(error, user) {
  					if (error) {
  						res.end('Login Failed! ' + error.message);
              done(error);
  					}
  					else {
  						res.end('Login Test Passed!');
  						done();
  					}
  				});
  			};
  		}).listen(config.test_server_port);
  		console.log('Listening in on localhost:3000. Go to http://localhost:3000 through a web browser');
  	  });
  });

  describe(':Get Share Count', function() {
  	it(':Should pass the number of shares that link has received through bufferapp', function(done) {
  	  bufferapp.getShareCount('http://bufferapp.com', function(err, count) {
  	  	if(err) done(err);
  	  	if(isNaN(parseInt(count))) done({code:NaN,message:"Count is not a number",value:count});
  	  	done();
  	  });
  	});
  });
});
