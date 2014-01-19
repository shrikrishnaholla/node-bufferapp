var BufferAppError = require('./error').BufferAppError;
var request = require('request');

// get Info
// --------
// Returns a single user.
// Takes a callback as a parameter to which it passes an [error object](error.html) if any, and a JSON
// response. A sample response, taken from http://bufferapp.com/developers/api/user
// ```javascript
// {
//   "_id":"4f0c0a06512f7ef214000000",
//   "activity_at":1343654640,
//   "created_at":1326189062,
//   "id":"4f0c0a06512f7ef214000000",
//   "plan":"free",
//   "referral_link":"http:\/\/bufferapp.com\/r\/abcde",
//   "referral_token":"abcde",
//   "secret_email":"buffer-abc123def456@to.bufferapp.com",
//   "timezone":"Asia\/Tel_Aviv"
// }
// ```
exports.getInfo = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getInfo call');
	};
	request(this.__api_base + '/user.json?access_token=' + this._token.toString()
		, function (error, response, body) {
			  var info, err;
			  if (!error && response.statusCode == 200) {
			    this.info = JSON.parse(body);
			    info = this.info;
			  };
			  if (error || response.statusCode != 200 || info.success == false) {
			  	err = new BufferAppError(error, response, info);
			  };
			  Callback(err, info);
		  }
	);
};
