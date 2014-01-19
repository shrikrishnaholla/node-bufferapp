var request = require('request')
, BufferUser = require('./bufferuser').BufferUser
, BufferAppError = require('./error').BufferAppError;

// BufferApp
// ---------
// This is the Buffer Client class. It takes an `options` object as a constructor.
// The `options` object needs to have
// - clientID : Your app's client ID. Can be obtained by registering your application in
// http://bufferapp.com/developers/apps/create
// - clientSecret : Your app's client secret. Also given when you register your app in Buffer.
// Keep this one secret!
// - callbackURI : Your callback url. This is set when creating the application.
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
	options.api_base = options.api_base || 'https://api.bufferapp.com/1';
	options.tokenURL = options.tokenURL || options.api_base + '/oauth2/token.json';
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
	this.__api_base = options.api_base;
};

// get Authorization URL
// ---------------------
// Stitches an authorization URL. Redirect the user to this URL to allow him to grant access to your application
/**
 * @function login
 * @return {String} authorizationURL
 **/
BufferApp.prototype.getAuthorizationURI = function() {
	var oauth2 = this._oauth2Options;
	return oauth2.authorizationURL + '?' + 'client_id=' + oauth2.clientID + '&' +
			'redirect_uri=' + oauth2.callbackURL + '&response_type=code';
};

// Login
// -----
// Logs you into Buffer. Accepts an authorization code obtained when the user grants access to your app,
// and a callback to which a BufferUser object is passed on authorization.
/**
 * @function login
 * @param {String} code
 * @param Callback: @param {BufferAppError} error, @param {BufferUser} user
 **/
BufferApp.prototype.login = function(code, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for login call');
	};
	if (typeof code === 'undefined') {
		throw new Error('Please pass the code sent as a query parameter to your redirect URL');
	};
	code = decodeURIComponent(code);
	var oauth2 = this._oauth2Options;
	var queryparams = {
	    client_id : oauth2.clientID,
	    client_secret : oauth2.clientSecret,
	    redirect_uri : oauth2.callbackURL,
	    code : code,
	    grant_type : 'authorization_code'
    };

    request({uri:oauth2.tokenURL, form: queryparams, method:"POST"}, function(error, response, body) {
        var reply, err, access_token;
        if (!error && response.statusCode == 200) {
			reply = JSON.parse(body);
			access_token = reply.access_token;
		};
		if (error || response.statusCode != 200 || reply.success == false) {
			err = new BufferAppError(error, response, reply);
		};
		var user = new BufferUser(access_token, oauth2.api_base);
		Callback(err, user);
    });
};

// get Share Count
// ---------------
// Given a URL, passes the number of shares that link has received through bufferapp to a callback.  
// Find out more at [links](links.html)
BufferApp.prototype.getShareCount = require('./links').getShareCount;

module.exports = BufferApp;
