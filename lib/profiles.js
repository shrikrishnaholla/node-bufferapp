var BufferAppError = require('./error').BufferAppError;

exports.getAllProfiles =  function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getAllProfiles call');
	};
	request('https://api.bufferapp.com/1/profiles.json?access_token=' + this._token.toString()
		, function (error, response, body) {
			  var profiles, err;
			  if (!error && response.statusCode == 200) {
			    this.profiles = JSON.parse(body);
			    profiles = this.profiles;
			  };
			  if (error || response.statusCode != 200 || profiles.success == false) {
			  	err = new BufferAppError(error, response, profiles);
			  };
			  Callback(err, profiles);
		  };
	);
};

exports.getProfile = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getProfile call');
	};
	request('https://api.bufferapp.com/1/profiles/' + id + '.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			  var profile, err;
			  if (!error && response.statusCode == 200) {
			    profile = JSON.parse(body);
			  };
			  if (error || response.statusCode != 200 || profile.success == false) {
			  	err = BufferAppError(error, response, profile);
			  };
			  Callback(err, profile);
		  };
	);
};

exports.getSchedule = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSchedule call');
	};
	request('https://api.bufferapp.com/1/profiles/' + id + '/schedules.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			  var schedules, err;
			  if (!error && response.statusCode == 200) {
			    schedules = JSON.parse(body);
			  };
			  if (error || response.statusCode != 200 || schedules.success == false) {
			  	err = BufferAppError(error, response, schedules);
			  };
			  Callback(err, schedules);
		  };
	);
};

exports.setSchedule = function(id, new_schedules, Callback) {
	request('https://api.bufferapp.com/1/profiles/' + id + '/schedules/update.json' + 
		new_schedules, "POST", {"Authorization": "Bearer " + this._token.toString()},
		function (error, response, body) {
			  var reply, err, success;
			  if (!error && response.statusCode == 200) {
			    reply = JSON.parse(body);
			    success = reply.success;
			  }
			  if (error || response.statusCode != 200 || reply.success == false) {
			  	err = BufferAppError(error, response, reply);
			  };
			  if (err || typeof Callback !== 'undefined') {
			  	Callback(err, success);
			  };
		  }
	);
};
