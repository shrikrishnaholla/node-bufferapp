var BufferAppError = require('./error').BufferAppError;

exports.getShareCount = function(url, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getProfile call');
	};
	request('https://api.bufferapp.com/1/links/shares.json?url=' + encodeURIComponent(url)
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
		  };
	);
};
