var BufferAppError = require('./error').BufferAppError;
var request = require('request');

// get Share Count
// ---------------
// Given a url, it retrieves the amount of shares the url has received through buffer service.
// The count is passed to a callback function
/** 
 * @function getShareCount
 * @param {String} url
 * @param {function} Callback: @param {BufferApp} error, @param {number} sharecount
 **/
exports.getShareCount = function(url, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getProfile call');
	};
	request(this.__api_base + '/links/shares.json?url=' + encodeURIComponent(url)
		, function (error, response, body) {
			  var reply, err, shares;
			  if (!error && response.statusCode == 200) {
			    reply = JSON.parse(body);
			    shares = reply.shares;
			  };
			  if (error || response.statusCode != 200 || reply.success == false) {
			  	err = new BufferAppError(error, response, reply);
			  };
			  Callback(err, reply.shares);
		  }
	);
};
