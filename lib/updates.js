var BufferAppError = require('./error').BufferAppError;

exports.getOneUpdate = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getOneUpdate call');
	};
	request('https://api.bufferapp.com/1/updates/' + id + '.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			var update, err;
			if (!error && response.statusCode == 200) {
				update = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || update.success == false) {
				err = new BufferAppError(error, response, update);
			};
			Callback(err, update);
		};
	);
};

exports.getBufferedUpdates = function(id, page, count, since, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getBufferedUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) page = args.shift(); else page = null;
    if(args.length > 0) count = args.shift(); else count = null;
    if(args.length > 0) since = args.shift(); else since = null;
    if(args.length > 0) utc = args.shift(); else utc = null;

    if (id === null) {
    	throw new Error('User ID required for getSentUpdates call');
    };

    var uri = 'https://api.bufferapp.com/1/profiles/' + id + '/updates/pending.json?access_token=' + this._token;
    if (page) uri += '&page=' + encodeURIComponent(page.toString());
    if (count) uri += '&count=' + encodeURIComponent(count.toString());
    if (since) uri += '&since=' + encodeURIComponent(since.toString());
    if (utc) uri += '&utc=' + encodeURIComponent(utc.toString());

    request(uri, function (error, response, body) {
			var bufferedUpdates, err;
			if (!error && response.statusCode == 200) {
				bufferedUpdates = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || bufferedUpdates.success == false) {
				err = new BufferAppError(error, response, bufferedUpdates);
			};
			Callback(err, bufferedUpdates);
		};
	);
};

exports.getSentUpdates = function(id, page, count, since, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSentUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) page = args.shift(); else page = null;
    if(args.length > 0) count = args.shift(); else count = null;
    if(args.length > 0) since = args.shift(); else since = null;
    if(args.length > 0) utc = args.shift(); else utc = null;

    if (id === null) {
    	throw new Error('User ID required for getSentUpdates call');
    };

    var uri = 'https://api.bufferapp.com/1/profiles/' + id + '/updates/sent.json?access_token=' + this._token;
    if (page) uri += '&page=' + encodeURIComponent(page.toString());
    if (count) uri += '&count=' + encodeURIComponent(count.toString());
    if (since) uri += '&since=' + encodeURIComponent(since.toString());
    if (utc) uri += '&utc=' + encodeURIComponent(utc.toString());

    request(uri, function (error, response, body) {
			var sentUpdates, err;
			if (!error && response.statusCode == 200) {
				sentUpdates = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || sentUpdates.success == false) {
				err = new BufferAppError(error, response, sentUpdates);
			};
			Callback(err, sentUpdates);
		};
	);
};

exports.getInteractions = function(id, event, page, count, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSentUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) event = args.shift(); else event = null;
    if(args.length > 0) page = args.shift(); else page = null;
    if(args.length > 0) count = args.shift(); else count = null;

    if (id === null) {
    	throw new Error('User ID required for getSentUpdates call');
    };
    if (event === null) {
    	throw new Error('Type of event to be retrieved needs to be specified for getSentUpdates call');
    };

    var uri = 'https://api.bufferapp.com/1/updates/' + id + '/interactions.json?access_token=' + this._token +
     '&' + event.toString();
    if (page) uri += '&page=' + encodeURIComponent(page.toString());
    if (count) uri += '&count=' + encodeURIComponent(count.toString());

    request(uri, function (error, response, body) {
			var interactions, err;
			if (!error && response.statusCode == 200) {
				interactions = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || interactions.success == false) {
				err = new BufferAppError(error, response, interactions);
			};
			Callback(err, interactions);
		};
	);
};

exports.reorderUpdates = function(id, order, offset, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSentUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) order = args.shift(); else order = null;
    if(args.length > 0) offset = args.shift(); else offset = null;
    if(args.length > 0) utc = args.shift(); else utc = null;

    if (id === null) {
    	throw new Error('User ID required for reorderUpdates call');
    };
    if (order === null) {
    	throw new Error('Type of order to be retrieved needs to be specified for reorderUpdates call');
    };

    var uri = 'https://api.bufferapp.com/1/profiles/' + id + '/updates/reorder.json';
    queryparams = {
    	order 		: order.toString()
    };
    if (offset) queryparams.offset = offset;
    if (utc) queryparams.utc = utc;

    request(uri, queryparams, "POST", {"Authorization": "Bearer " + this._token.toString()},
    	function (error, response, body) {
			var new_order, err;
			if (!error && response.statusCode == 200) {
				new_order = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_order.success == false) {
				err = new BufferAppError(error, response, new_order);
			};
			Callback(err, new_order);
		};
	);
};

exports.shuffleUpdates = function(id, count, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSentUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) count = args.shift(); else count = null;
    if(args.length > 0) utc = args.shift(); else utc = null;

    if (id === null) {
    	throw new Error('User ID required for shuffleUpdates call');
    };

    var uri = 'https://api.bufferapp.com/1/profiles/' + id + '/updates/shuffle.json';
    queryparams = {};
    if (count) queryparams.count = count.toString();
    if (utc) queryparams.utc = utc.toString();

    request(uri, queryparams, "POST", {"Authorization": "Bearer " + this._token.toString()},
    	function (error, response, body) {
			var new_order, err;
			if (!error && response.statusCode == 200) {
				new_order = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_order.success == false) {
				err = new BufferAppError(error, response, new_order);
			};
			Callback(err, new_order);
		};
	);
};

exports.createStatus = function(id, text, profile_ids, shorten, now, top, media, scheduled_at, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSentUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) text = args.shift(); else text = null;
    if(args.length > 0) profile_ids = args.shift(); else profile_ids = null;
    if(args.length > 0) shorten = args.shift(); else shorten = null;
    if(args.length > 0) now = args.shift(); else now = null;
    if(args.length > 0) top = args.shift(); else top = null;
    if(args.length > 0) media = args.shift(); else media = null;
    if(args.length > 0) scheduled_at = args.shift(); else scheduled_at = null;

    if (id === null) {
    	throw new Error('User ID required for createStatus call');
    };
    if (text === null) {
    	throw new Error("Can't create status without text");
    };
    if (profile_ids === null) {
    	throw new Error("Can't create status without knowing profile ids to update against");
    };

    var uri = 'https://api.bufferapp.com/1/updates/create.json';
    queryparams = {
    	text 			: text,
    	profile_ids		: profile_ids,
    };
    if (shorten) queryparams.shorten = shorten;
    if (shorten) queryparams.now = now;
    if (shorten) queryparams.top = top;
    if (shorten) queryparams.media = media;
    if (shorten) queryparams.scheduled_at = scheduled_at;

    request(uri, queryparams, "POST", {"Authorization": "Bearer " + this._token.toString()},
    	function (error, response, body) {
			var new_status, err;
			if (!error && response.statusCode == 200) {
				new_status = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_status.success == false) {
				err = new BufferAppError(error, response, new_status);
			};
			Callback(err, new_status);
		};
	);
};

exports.updateStatus = function(id, text, now, media, scheduled_at, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for updateStatus call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) text = args.shift(); else text = null;
    if(args.length > 0) now = args.shift(); else now = null;
    if(args.length > 0) media = args.shift(); else media = null;
    if(args.length > 0) utc = args.shift(); else utc = null;
    if(args.length > 0) scheduled_at = args.shift(); else scheduled_at = null;

    if (id === null) {
    	throw new Error('User ID required for updateStatus call');
    };
    if (text === null) {
    	throw new Error("Can't update status without text");
    };

    var uri = 'https://api.bufferapp.com/1/updates/' + id + '/update.json';
    queryparams = {
    	text : text,
    };
    if (shorten) queryparams.now = now;
    if (shorten) queryparams.media = media;
    if (shorten) queryparams.utc = utc;
    if (shorten) queryparams.scheduled_at = scheduled_at;

    request(uri, queryparams, "POST", {"Authorization": "Bearer " + this._token.toString()},
    	function (error, response, body) {
			var updated_status, err;
			if (!error && response.statusCode == 200) {
				updated_order = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || updated_status.success == false) {
				err = new BufferAppError(error, response, updated_status);
			};
			Callback(err, updated_status);
		};
	);
};

exports.shareOneStatus = function(id, Callback) {
	request('https://api.bufferapp.com/1/updates/' + id + '/share.json', 
		{},  "POST", {"Authorization": "Bearer " + this._token.toString()},
		function (error, response, body) {
			var reply, err, success;
			if (!error && response.statusCode == 200) {
				reply = JSON.parse(body);
				success = reply.success;
			};
			if (error || response.statusCode != 200 || reply.success == false) {
				err = new BufferAppError(error, response, reply);
			};
			Callback(err, success);
		};
	);
};

exports.deleteOneStatus = function(id, Callback) {
	request('https://api.bufferapp.com/1/updates/' + id + '/destroy.json', 
		{},  "POST", {"Authorization": "Bearer " + this._token.toString()},
		function (error, response, body) {
			var reply, err, success;
			if (!error && response.statusCode == 200) {
				reply = JSON.parse(body);
				success = reply.success;
			};
			if (error || response.statusCode != 200 || reply.success == false) {
				err = new BufferAppError(error, response, reply);
			};
			Callback(err, success);
		};
	);
};

exports.moveToTop = function(id, Callback) {
	request('https://api.bufferapp.com/1/updates/' + id + '/move_to_top.json', 
		{},  "POST", {"Authorization": "Bearer " + this._token.toString()},
		function (error, response, body) {
			var reply, err, success;
			if (!error && response.statusCode == 200) {
				reply = JSON.parse(body);
				success = reply.success;
			};
			if (error || response.statusCode != 200 || reply.success == false) {
				err = new BufferAppError(error, response, reply);
			};
			Callback(err, success);
		};
	);
};
