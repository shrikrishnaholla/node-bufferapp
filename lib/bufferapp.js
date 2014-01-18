var passport = require('passport')
, OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
, request = require('request')
, qs = require('qs')
, BufferUser = require('./bufferuser').BufferUser;

// BufferApp
// ---------
// This is the Buffer Client class. It takes an `options` object as a constructor.
// The `options` object needs to have
// - clientID : Your app's client ID. Can be obtained by registering your application in
// http://bufferapp.com/developers/apps/create
// - clientSecret : Your app's client secret. Also given when you register your app in Buffer.
// Keep this one secret!
// - callbackURL : Your callback url. This is set when creating the application.
// This is also the url that the client comes back to when the authentication completes  
//   
// There are two more optional values
// - authorizationURL : By default, it is set to https://bufferapp.com/oauth2/authorize .
// However, if the guys at Buffer change it and I'm not around, you can just pass the new endpoint
// - tokenURL : Same as above. This is set by default to https://api.bufferapp.com/1/oauth2/token.json
/** 
 * @class BufferApp
 * @param {object} options
 **/
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

// Login
// -----
// Logs you into Buffer. Uses [Passportjs](http://passportjs.org) to authorize.
// Accepts a callback to which a BufferUser object is passed on authorization.
/**
 * @function login
 * @param {function} Callback: @param {BufferUser} user
 **/
BufferApp.prototype.login = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for login call');
	};
	var user;
	passport.use(new OAuth2Strategy(this._oauth2Options,
	  function(accessToken, refreshToken, profile, done) {
	  	Callback(new BufferUser(profile, accessToken));
	  	done();
	  });
	);
};

// get Share Count
// ---------------
// Given a URL, passes the number of shares that link has received through bufferapp to a callback.  
// Find out more at [links](links.html)
BufferApp.prototype.getShareCount = require('./links').getShareCount;

module.exports = BufferApp;
