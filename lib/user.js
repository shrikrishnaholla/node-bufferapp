var BufferAppError = require('./error').BufferAppError;

exports.getInfo = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getInfo call');
	};
	request('https://api.bufferapp.com/1/user.json?access_token=' + this._token.toString()
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
		  };
	);
};
