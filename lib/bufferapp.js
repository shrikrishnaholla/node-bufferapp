var passport = require('passport')
, OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
, request = require('request')
, qs = require('qs')
, BufferUser = require('./bufferuser').BufferUser;

function BufferApp(options) {
	options = options || {};
	options.authorizationURL = options.authorizationURL || 'https://bufferapp.com/oauth2/authorize';
	options.tokenURL = options.tokenURL || 'https://api.bufferapp.com/1/oauth2/token.json';
	if (!options.clientID) {
		throw new Error('Client ID not specified. Go to http://bufferapp.com/developers/api/oauth' + 
			' to know more about getting the Client ID for your application');
	};
	if (!options.clientSecret) {
		throw new Error('client Secret not specified. Go to http://bufferapp.com/developers/api/oauth' + 
			' to know more about getting the Client Secret for your application');
	};
	if (!options.callbackURL) {
		throw new Error('Callback URL not set. Go to http://bufferapp.com/developers/api/oauth' + 
			' to know more about setting a Callback URL for your application');
	};
	this._oauth2Options = options;
};

BufferApp.prototype.login = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for login call');
	};
	var user;
	passport.use(new OAuth2Strategy(this._oauth2Options,
	  function(accessToken, refreshToken, profile, done) {
	  	Callback(new BufferUser(accessToken));
	  	done();
	  });
	);
};

BufferApp.prototype.getShareCount = require('./links').getShareCount;

module.exports = BufferApp;
