var BufferAppError = require('./error').BufferAppError;

exports.getConfigInfo = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getConfigInfo call');
	};
	request('https://api.bufferapp.com/1/info/configuration.json?access_token=' + this._token.toString(), 
		function (error, response, body) {
			var config, err;
			if (!error && response.statusCode == 200) {
			  config = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || config.success == false) {
				err = new BufferAppError(error, response, config);
			};
			Callback(err, config);
		};
	);
};
