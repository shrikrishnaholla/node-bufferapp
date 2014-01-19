var BufferAppError = require('./error').BufferAppError;
var request = require('request');

// get One Update
// --------------
// Get a single social media update.
// Takes a social media account id and a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// { 
//   "id" : "4eb8565e0acb04bb82000004",
//   "created_at" : 1320703582,
//   "day" : "Monday 7th November",
//   "due_at" : 1320742680,
//   "due_time" : "10:09 pm",
//   "profile_id" : "4eb854340acb04e870000010",
//   "profile_service" : "twitter",
//   "sent_at" : 1320744001,
//   "service_update_id" : "133667319959392256",
//   "statistics" : { 
//       "reach" : 2460,
//       "clicks" : 56,
//       "retweets": 20,
//       "favorites": 1,
//       "mentions": 1
//   },
//   "status" : "sent",
//   "text" : "This is just the beginning, the very beginning, of the transfor...",
//   "text_formatted" : "This is just the beginning, the very beginning, of th...",
//   "user_id" : "4eb9276e0acb04bb81000067",
//   "via" : "chrome"
// }
// ```
/**
 * @function getOneUpdate
 * @param {String} id
 * @param Callback: @param {BufferAppError} error, @param {object} update
 **/
exports.getOneUpdate = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getOneUpdate call');
	};
	request(this.__api_base + '/updates/' + id + '.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			var update, err;
			if (!error && response.statusCode == 200) {
				update = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || update.success == false) {
				err = new BufferAppError(error, response, update);
			};
			Callback(err, update);
		}
	);
};

// get Buffered Updates
// --------------------
// Get an array of updates that are currently in the buffer for an individual social media profile.
// Takes the following parameters
// - **page**  
//   _optional_, _integer_  
//   Specifies the page of status updates to receive. If not specified the first page of results will be returned.
// - **count**  
//   _optional_, _integer_  
//   Specifies the number of status updates to receive. If provided, must be between 1 and 100.
// - **since**  
//   _optional_, _timestamp_  
//   Specifies a unix timestamp which only status updates created after this time will be retrieved.
// - **utc**  
//   _optional_, _boolean_  
//   If utc is set times will be returned relative to UTC rather than the users associated timezone.
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//   "total" : 8,
//   "updates" : [ {
//       "id" : "4ec93ae4512f7e6307000002",
//       "created_at" : 1320703582,
//       "day" : "Monday 7th November",
//       "due_at" : 1320543480,
//       "due_time" : "07:01 pm",
//       "profile_id" : "4eb854340acb04e870000010",
//       "profile_service" : "twitter",
//       "status" : "buffer",
//       "text" : "This is me in an alternate life where i can breakdance j.mp/w...",
//       "text_formatted" : "This is me in an alternate life where i can breakda...",
//       "user_id" : "4eb9276e0acb04bb81000067",
//       "via" : "firefox"
//   },
//   {
//       ...
//   }]
// }
// ```
/**
 * @function getBufferedUpdates
 * @param {String} id
 * @optional @param {number} page
 * @optional @param {number} count
 * @optional @param {number} since
 * @optional @param {boolean} utc
 * @param Callback: @param {BufferAppError} error, @param {object} bufferedUpdates
 **/
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
    	throw new Error('User ID required for getBufferedUpdates call');
    };

    var uri = this.__api_base + '/profiles/' + id + '/updates/pending.json?access_token=' + this._token;
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
		}
	);
};

// get Sent Updates
// ----------------
// Get an array of updates that have been sent from the buffer for an individual social media profile.
// Takes the following parameters
// - **page**  
//   _optional_, _integer_  
//   Specifies the page of status updates to receive. If not specified the first page of results will be returned.
// - **count**  
//   _optional_, _integer_  
//   Specifies the number of status updates to receive. If provided, must be between 1 and 100.
// - **since**  
//   _optional_, _timestamp_  
//   Specifies a unix timestamp which only status updates sent after this time will be retrieved.
// - **utc**  
//   _optional_, _boolean_  
//   If utc is set times will be returned relative to UTC rather than the users associated timezone.
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//   "total" : 97,
//   "updates" : [ {
//       "id" : "4ebc559d0acb04221b000008",
//       "created_at" : 1320703582,
//       "day" : "Monday 7th November",
//       "due_at" : 1320742680,
//       "due_time" : "10:09 pm",
//       "profile_id" : "4eb854340acb04e870000010",
//       "profile_service" : "twitter",
//       "sent_at" : 1320744001,
//       "service_update_id" : "133667319959392256",
//       "statistics" : { 
//           "reach" : 2460,
//           "clicks" : 56,
//           "retweets": 20,
//           "favorites": 1,
//           "mentions": 1
//       },
//       "status" : "sent",
//       "text" : "This is just the beginning, the very beginning, of the tran...",
//       "text_formatted" : "This is just the beginning, the very beginning, o...",
//       "user_id" : "4eb9276e0acb04bb81000067",
//       "via" : "chrome"
//   },
//   {
//       ...
//   }]
// }
// ```
/**
 * @function getSentUpdates
 * @param {String} id
 * @optional @param {number} page
 * @optional @param {number} count
 * @optional @param {number} since
 * @optional @param {boolean} utc
 * @param Callback: @param {BufferAppError} error, @param {object} sentUpdates
 **/
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

    var uri = this.__api_base + '/profiles/' + id + '/updates/sent.json?access_token=' + this._token;
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
		}
	);
};

// get Interactions
// ----------------
// Returns the detailed information on individual interactions with the social media update such as
// favorites, retweets and likes.
// Takes the following parameters
// - **event**  
//   _required_, _string_  
//   Specifies a type of event to be retrieved, for example "retweet", "like", "comment", "mention" or "reshare".
//   They can also be plural (e.g., "reshares"). Plurality has no effect other than visual semantics.
//   See getConfigInfo for more information on supported interaction events.
// - **page**  
//   _optional_, _integer_  
//   Specifies the page of interactions to receive. If not specified the first page of results will be returned.
// - **count**  
//   _optional_, _integer_  
//   Specifies the number of interactions to receive. If provided, must be between 1 and 100.
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//     "total":2,
//     "interactions":[
//         {
//             "_id":"50f98310c5ac415d7f2e74fd",
//             "created_at":1358509258,
//             "event":"favorite",
//             "id":"50f98310c5ac415d7f2e74fd",
//             "interaction_id":"292235127847788544",
//             "user":{
//                 "username":"Crispy Potatoes",
//                 "followers":160,
//                 "avatar":"http:\/\/si0.twimg.com\/profile_images\/...",
//                 "avatar_https":"https:\/\/si0.twimg.com\/profile_images\/...",
//                 "twitter_id":"70712344376"
//             }
//         },
//         {
//             "_id":"50f8623ac5ac415d7f1d4f77",
//             "created_at":1358454592,
//             "event":"retweet",
//             "id":"50f8623ac5ac415d7f1d4f77",
//             "interaction_id":"292005842654461953",
//             "user":{
//                 "username":"Lucky Number 8",
//                 "followers":36079,
//                 "avatar":"http:\/\/si0.twimg.com\/profile_images\/2901468678\/...",
//                 "avatar_https":"https:\/\/si0.twimg.com\/profile_images\/2901468678\/...",
//                 "twitter_id":"1423444249"
//             }
//         }
//     ]
// }
// ```
/**
 * @function getInteractions
 * @param {String} id
 * @param {String} event
 * @optional @param {number} page
 * @optional @param {number} count
 * @param Callback: @param {BufferAppError} error, @param {object} interactions
 **/
exports.getInteractions = function(id, event, page, count, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getInteractions call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) event = args.shift(); else event = null;
    if(args.length > 0) page = args.shift(); else page = null;
    if(args.length > 0) count = args.shift(); else count = null;

    if (id === null) {
    	throw new Error('User ID required for getInteractions call');
    };
    if (event === null) {
    	throw new Error('Type of event to be retrieved needs to be specified for getInteractions call');
    };

    var uri = this.__api_base + '/updates/' + id + '/interactions.json?access_token=' + this._token +
     '&event=' + event.toString();
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
		}
	);
};

// reorder Updates
// ---------------
// Edit the order at which statuses for the specified social media profile will be sent out of the buffer.
// Takes the following parameters
// - **order**  
//   _required_, _integer_  
//   An ordered array of status update id’s. This can be a partial array in combination with the
//   offset parameter or a full array of every update in the profiles Buffer.
// - **offset**  
//   _optional_, _integer_  
//   Specifies the number of status updates to receive. If provided, must be between 1 and 100.
// - **utc**  
//   _optional_, _boolean_  
//   If utc is set times will be returned relative to UTC rather than the users associated timezone.
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//     "success" : true,
//     "updates" : [{
//         "id" : "4eb854340acb04e870000010",
//         "created_at" : 1320703582,
//         "day" : "Saturday 5th November",
//         "due_at" : 1320742680,
//         "due_time" : "08:01 am",
//         "profile_id" : "4eb854340acb04e870000010",
//         "profile_service" : "twitter",
//         "status" : "buffer",
//         "text" : "3 Incredible Stories Made Possible Through Twitter j.mp/u...",
//         "text_formatted" : "3 Incredible Stories Made Possible Through Twit...",
//         "user_id" : "4eb9276e0acb04bb81000067",
//         "via" : "safari"
//     },
//     {
//     	...
//     }]
// }
// ```
/**
 * @function reorderUpdates
 * @param {String} id
 * @param {Array} order
 * @optional @param {number} offset
 * @optional @param {boolean} utc
 * @param Callback: @param {BufferAppError} error, @param {object} new_order
 **/
exports.reorderUpdates = function(id, order, offset, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for reorderUpdates call');
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

    var uri = this.__api_base + '/profiles/' + id + '/updates/reorder.json';
    queryparams = {
    	order 		: order
    };
    if (offset) queryparams.offset = offset;
    if (utc) queryparams.utc = utc;

    request({
            uri :uri,
            form : queryparams,
            method : "POST",
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
    	function (error, response, body) {
			var new_order, err;
			if (!error && response.statusCode == 200) {
				new_order = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_order.success == false) {
				err = new BufferAppError(error, response, new_order);
			};
			Callback(err, new_order);
		}
	);
};

// shuffle Updates
// ---------------
// Randomize the order at which statuses for the specified social media profile will be sent out of the buffer.
// Takes the following parameters
// - **count**
//   _optional_, _integer_  
//   Specifies the number of status updates returned. These will correspond to the first status updates that will be posted.
// - **utc**  
//   _optional_, _boolean_  
//   If utc is set times will be returned relative to UTC rather than the users associated timezone.
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//     "success" : true,
//     "updates" : [{
//         "id" : "4eb854340acb04e870000010",
//         "created_at" : 1320703582,
//         "day" : "Saturday 5th November",
//         "due_at" : 1320742680,
//         "due_time" : "08:01 am",
//         "profile_id" : "4eb854340acb04e870000010",
//         "profile_service" : "twitter",
//         "status" : "buffer",
//         "text" : "3 Incredible Stories Made Possible Through Twitter j.mp/u...",
//         "text_formatted" : "3 Incredible Stories Made Possible Through Twit...",
//         "user_id" : "4eb9276e0acb04bb81000067",
//         "via" : "safari"
//     },
//     {
//     	...
//     }]
// }
// ```
/**
 * @function reorderUpdates
 * @param {String} id
 * @optional @param {number} count
 * @optional @param {boolean} utc
 * @param Callback: @param {BufferAppError} error, @param {object} new_order
 **/
exports.shuffleUpdates = function(id, count, utc, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for shuffleUpdates call');
	};
    if(args.length > 0) id = args.shift(); else id = null;
    if(args.length > 0) count = args.shift(); else count = null;
    if(args.length > 0) utc = args.shift(); else utc = null;

    if (id === null) {
    	throw new Error('User ID required for shuffleUpdates call');
    };

    var uri = this.__api_base + '/profiles/' + id + '/updates/shuffle.json';
    queryparams = {};
    if (count) queryparams.count = count.toString();
    if (utc) queryparams.utc = utc.toString();

    request({
            uri : uri,
            form : queryparams,
            method : "POST",
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
    	function (error, response, body) {
			var new_order, err;
			if (!error && response.statusCode == 200) {
				new_order = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_order.success == false) {
				err = new BufferAppError(error, response, new_order);
			};
			Callback(err, new_order);
		}
	);
};

// create Status
// -------------
// Create one or more new status updates.
// Takes the following parameters
// - **text**  
//   _required_, _string_  
//   The status update text
// - **profile_ids**  
//   _required_, _array_  
//   An array of profile id’s that the status update should be sent to. Invalid profile_id’s will be silently ignored.
// - **shorten**  
//   _optional_, _boolean_  
//   If shorten is false links within the text will not be automatically shortened, otherwise they will.
// - **now**  
//   _optional_, _boolean_  
//   If now is set, this update will be sent immediately to all profiles instead of being added to the buffer.
// - **top**  
//   _optional_, _boolean_  
//   If top is set, this update will be added to the top of the buffer and will become the next update sent.
// - **media**  
//   _optional_, _associative array_  
//   An associative array of media to be attached to the update, currently accepts
//   link, description, title and photo parameters.
// - **scheduled_at**  
//   _optional_, _timestamp or ISO 8601 formatted date-time_  
//   A date describing when the update should be posted. Overrides any top or now parameter.
//   When using ISO 8601 format, if no UTC offset is specified, UTC is assumed.  
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//     "success" : true,
//     "buffer_count" : 10,
//     "buffer_percentage" : 20,
//     "updates" : [{
//         "id" : "4ecda256512f7ee521000004",
//         "created_at" : 1320703582,
//         "day" : "Saturday 26th November",
//         "due_at" : 1320742680,
//         "due_time" : "11:05 am",
//         "media" : {
//             "link" : "http://google.com",
//             "title" : "Google",
//             "description" : "The google homepage"
//         },
//         "profile_id" : "4eb854340acb04e870000010",
//         "profile_service" : "twitter",
//         "status" : "buffer",
//         "text" : "This is an example update",
//         "text_formatted" : "This is an example update",
//         "user_id" : "4eb9276e0acb04bb81000067",
//         "via" : "api"
//     },
//     {
//         ...
//     }]
// }
// ```
/**
 * @function createStatus
 * @param {String} text
 * @param {Array} profile_ids
 * @optional @param {boolean} shorten
 * @optional @param {boolean} now
 * @optional @param {boolean} top
 * @optional @param {object} media
 * @optional @param {number|String} scheduled_at
 * @param Callback: @param {BufferAppError} error, @param {object} new_status
 **/
exports.createStatus = function(text, profile_ids, shorten, now, top, media, scheduled_at, Callback) {
	var args = [];
	for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    };
    Callback = args.pop();
    if (typeof Callback !== 'function') {
		throw new Error('Callback needed for createStatus call');
	};
    if(args.length > 0) text = args.shift(); else text = null;
    if(args.length > 0) profile_ids = args.shift(); else profile_ids = null;
    if(args.length > 0) shorten = args.shift(); else shorten = null;
    if(args.length > 0) now = args.shift(); else now = null;
    if(args.length > 0) top = args.shift(); else top = null;
    if(args.length > 0) media = args.shift(); else media = null;
    if(args.length > 0) scheduled_at = args.shift(); else scheduled_at = null;

    if (text === null) {
    	throw new Error("Can't create status without text");
    };
    if (profile_ids === null) {
    	throw new Error("Can't create status without knowing profile ids to update against");
    };

    var uri = this.__api_base + '/updates/create.json';
    queryparams = {
    	text 			: text,
    	profile_ids		: profile_ids,
    };
    if (shorten) queryparams.shorten = shorten;
    if (now) queryparams.now = now;
    if (top) queryparams.top = top;
    if (media) queryparams.media = media;
    if (scheduled_at) queryparams.scheduled_at = scheduled_at;

    request({
            uri : uri,
            form : queryparams,
            method : "POST",
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
    	function (error, response, body) {
			var new_status, err;
			if (!error && response.statusCode == 200) {
				new_status = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_status.success == false) {
				err = new BufferAppError(error, response, new_status);
			};
			Callback(err, new_status);
		}
	);
};

// update Status
// -------------
// Edit an existing, individual status update.
// Takes the following parameters
// - **text**  
//   _required_, _string_  
//   The status update text
// - **now**  
//   _optional_, _boolean_  
//   If now is set, this update will be sent immediately to all profiles instead of being added to the buffer.
// - **media**  
//   _optional_, _associative array_  
//   An associative array of media to be attached to the update, currently accepts
//   link, description, title and photo parameters.
// - **utc**    
//   _optional_, _boolean_  
//   If utc is set times will be returned relative to UTC rather than the users associated timezone.
// - **scheduled_at**  
//   _optional_, _timestamp or ISO 8601 formatted date-time_  
//   A date describing when the update should be posted. Overrides any top or now parameter.
//   When using ISO 8601 format, if no UTC offset is specified, UTC is assumed.  
// 
// It also takes a callback as a parameter to which it passes an [error object](error.html),
// if any, and a JSON response. A sample response, taken from http://bufferapp.com/developers/api/updates is  
// ```javascript
// {
//     "success" : true,
//     "buffer_count" : 10,
//     "buffer_percentage" : 20,
//     "update" : {
//         "id" : "4ecda256512f7ee521000004",
//         "client_id" : "4f850cc93733aa9301000002",
//         "created_at" : 1320703582,
//         "day" : "Saturday 26th November",
//         "due_at" : 1320742680,
//         "due_time" : "11:05 am",
//         "media" : {
//             "link" : "http://google.com",
//             "title" : "Google",
//             "description" : "The google homepage"
//         },
//         "profile_id" : "4eb854340acb04e870000010",
//         "profile_service" : "twitter",
//         "status" : "buffer",
//         "text" : "This is an edited update",
//         "text_formatted" : "This is an edited update",
//         "user_id" : "4eb9276e0acb04bb81000067",
//         "via" : "api"
//     }
// }
// ```
/**
 * @function updatedStatus
 * @param {String} id
 * @param {String} text
 * @optional @param {boolean} now
 * @optional @param {object} media
 * @optional @param {boolean} utc
 * @optional @param {number|String} scheduled_at
 * @param Callback: @param {BufferAppError} error, @param {object} updated_status
 **/
exports.updateStatus = function(id, text, now, media, utc, scheduled_at, Callback) {
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

    var uri = this.__api_base + '/updates/' + id + '/update.json';
    queryparams = {
    	text : text,
    };
    if (now) queryparams.now = now;
    if (media) queryparams.media = media;
    if (utc) queryparams.utc = utc;
    if (scheduled_at) queryparams.scheduled_at = scheduled_at;

    request({
            uri : uri, 
            form : queryparams, 
            method : "POST", 
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
    	function (error, response, body) {
			var updated_status, err;
			if (!error && response.statusCode == 200) {
				updated_status = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || updated_status.success == false) {
				err = new BufferAppError(error, response, updated_status);
			};
			Callback(err, updated_status);
		}
	);
};

// share One Status
// ----------------
// Immediately shares a single pending update and recalculates times for updates remaining in the queue.
// Takes an id for an update, and an optional Callback on completion
/**
 * @function shareOneStatus
 * @param {String} id
 * @optional @param {function} Callback: @param {BufferAppError} error, @param {boolean} success
 **/
exports.shareOneStatus = function(id, Callback) {
	request({
            uri : this.__api_base + '/updates/' + id + '/share.json', 
            method : "POST",
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
		function (error, response, body) {
			var reply, err, success;
			if (!error && response.statusCode == 200) {
				reply = JSON.parse(body);
				success = reply.success;
			};
			if (error || response.statusCode != 200 || reply.success == false) {
				err = new BufferAppError(error, response, reply);
                if (Callback == undefined) throw err;
			};
            if (Callback != undefined) {
		        Callback(err, success);
            }
		}
	);
};

// delete One Status
// -----------------
// Permanently delete an existing status update.
// Takes an id for a status update, and an optional Callback on completion
/**
 * @function deleteOneStatus
 * @param {String} id
 * @optional @param {function} Callback: @param {BufferAppError} error, @param {boolean} success
 **/
exports.deleteOneStatus = function(id, Callback) {
	request({
            uri : this.__api_base + '/updates/' + id + '/destroy.json', 
            method : "POST", 
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
		function (error, response, body) {
			var reply, err, success;
			if (!error && response.statusCode == 200) {
				reply = JSON.parse(body);
				success = reply.success;
			};
			if (error || response.statusCode != 200 || reply.success == false) {
				err = new BufferAppError(error, response, reply);
			if (Callback == undefined) throw err;
            };
            if (Callback != undefined) {
                Callback(err, success);
            }
        }
	);
};

// move To Top
// -----------
// Move an existing status update to the top of the queue and recalculate times for all updates in the queue.
// Returns the update with its new posting time.
// Takes an id for a status update, and an optional Callback to which the JSON response is sent along with
// an [error object](error.html), if any  
// A sample response, taken from http://bufferapp.com/developers/api/updates is 
// ```javascript
// { 
//   "id" : "4eb8565e0acb04bb82000004",
//   "created_at" : 1320703582,
//   "day" : "Monday 7th November",
//   "due_at" : 1320742680,
//   "due_time" : "10:09 pm",
//   "profile_id" : "4eb854340acb04e870000010",
//   "profile_service" : "twitter",
//   "sent_at" : 1320744001,
//   "service_update_id" : "133667319959392256",
//   "statistics" : { 
//       "reach" : 2460,
//       "clicks" : 56,
//       "retweets": 20,
//       "favorites": 1,
//       "mentions": 1
//   },
//   "status" : "sent",
//   "text" : "This is just the beginning, the very beginning, of the transfor...",
//   "text_formatted" : "This is just the beginning, the very beginning, of th...",
//   "user_id" : "4eb9276e0acb04bb81000067",
//   "via" : "chrome"
// }
// ```
/**
 * @function moveToTop
 * @param {String} id
 * @optional @param {function} Callback: @param {BufferAppError} error, @param {boolean} new_status_update
 **/
exports.moveToTop = function(id, Callback) {
	request({
            uri : this.__api_base + '/updates/' + id + '/move_to_top.json', 
            method : "POST", 
            headers : {"Authorization": "Bearer " + this._token.toString()}
        },
		function (error, response, body) {
			var new_status_update, err;
			if (!error && response.statusCode == 200) {
				new_status_update = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || new_status_update.success == false) {
				err = new BufferAppError(error, response, new_status_update);
			};
			Callback(err, new_status_update);
		}
	);
};
