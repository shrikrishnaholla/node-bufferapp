var BufferAppError = require('./error').BufferAppError;
var request = require('request');

// get All Profiles
// ----------------
// Get all social media profiles connected to a users account.
// Takes a callback as a parameter to which it passes an [error object](error.html) if any, and a JSON
// response. A sample response, taken from http://bufferapp.com/developers/api/profiles is  
// ```javascript
// [ { 
//     "avatar" : "http://a3.twimg.com/profile_images/1405180232.png",
//     "created_at" :  1320703028,
//     "default" : true,
//     "formatted_username" : "@skinnyoteam",
//     "id" : "4eb854340acb04e870000010",
//     "schedules" : [{ 
//         "days" : [ 
//             "mon",
//             "tue",
//             "wed",
//             "thu",
//             "fri"
//         ],
//         "times" : [ 
//             "12:00",
//             "17:00",
//             "18:00"
//         ]
//     }],
//     "service" : "twitter",
//     "service_id" : "164724445",
//     "service_username" : "skinnyoteam",
//     "statistics" : { 
//         "followers" : 246 
//     },
//     "team_members" : [
//         "4eb867340acb04e670000001"
//     ],
//     "timezone" : "Europe/London",
//     "user_id" : "4eb854340acb04e870000010"
//   },
//   {
// 	...
//   }
// ]
// ```
/**
 * @function getAllProfiles
 * @param Callback: @param {BufferAppError} error, @param {object} profiles
 **/
exports.getAllProfiles =  function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getAllProfiles call');
	};
	request(this.__api_base + '/profiles.json?access_token=' + this._token.toString()
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
		  }
	);
};

// get Profile
// -----------
// Get details of the single specified social media profile.
// Takes an id for a social media account and a Callback to which the JSON response is sent along with
// an [error object](error.html), if any  
// A sample response, taken from http://bufferapp.com/developers/api/profiles is 
// ```javascript
// { 
//   "avatar" : "http://a3.twimg.com/profile_images/1405180232.png",
//   "created_at" :  1320703028,
//   "default" : true,
//   "formatted_username" : "@skinnyoteam",
//   "id" : "4eb854340acb04e870000010",
//   "schedules" : [{ 
//       "days" : [ 
//           "mon",
//           "tue",
//           "wed",
//           "thu",
//           "fri"
//       ],
//       "times" : [ 
//           "12:00",
//           "17:00",
//           "18:00"
//       ]
//   }],
//   "service" : "twitter",
//   "service_id" : "164724445",
//   "service_username" : "skinnyoteam",
//   "statistics" : { 
//       "followers" : 246 
//   },
//   "team_members" : [
//       "4eb867340acb04e670000001"
//   ],
//   "timezone" : "Europe/London",
//   "user_id" : "4eb854340acb04e870000010"
// }
// ```
/**
 * @function getProfile
 * @param {String} id
 * @param {function} Callback: @param {BufferAppError} error, @param {object} profile
 **/
exports.getProfile = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getProfile call');
	};
	request(this.__api_base + '/profiles/' + id + '.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			  var profile, err;
			  if (!error && response.statusCode == 200) {
			    profile = JSON.parse(body);
			  };
			  if (error || response.statusCode != 200 || profile.success == false) {
			  	err = BufferAppError(error, response, profile);
			  };
			  Callback(err, profile);
		  }
	);
};

// get Schedule
// ------------
// Returns details of the posting schedules associated with a social media profile.
// Takes an id for a social media account and a Callback to which the JSON response is sent along with
// an [error object](error.html), if any  
// A sample response, taken from http://bufferapp.com/developers/api/profiles is 
// ```javascript
// [{ 
//   "days" : [ 
//       "mon",
//       "tue",
//       "wed",
//       "thu",
//       "fri"
//   ],
//   "times" : [ 
//       "12:00",
//       "17:00",
//       "18:00"
//   ]
// },
// {
//   ...
// }]
// ```
/**
 * @function getSchedule
 * @param {String} id
 * @param {function} Callback: @param {BufferAppError} error, @param {object} schedules
 **/
exports.getSchedule = function(id, Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getSchedule call');
	};
	request(this.__api_base + '/profiles/' + id + '/schedules.json?access_token=' + 
		this._token.toString(), function (error, response, body) {
			  var schedules, err;
			  if (!error && response.statusCode == 200) {
			    schedules = JSON.parse(body);
			  };
			  if (error || response.statusCode != 200 || schedules.success == false) {
			  	err = BufferAppError(error, response, schedules);
			  };
			  Callback(err, schedules);
		  }
	);
};

// set Schedule
// ------------
// Set the posting schedules for the specified social media profile.
// Takes an id for a social media account, an array of schedules and an optional Callback on completion
// Format of the `new_schedules` should be same as that of the JSON response to [getSchedule](#section-6)
/**
 * @function setSchedule
 * @param {String} id
 * @param {object} new_schedules
 * @optional @param {function} Callback: @param {BufferAppError} error, @param {boolean} success
 **/
exports.setSchedule = function(id, new_schedules, Callback) {
	request({
			uri : this.__api_base + '/profiles/' + id + '/schedules/update.json',
			form : { schedules : new_schedules },
			method : "POST", 
			headers : {"Authorization": "Bearer " + this._token.toString()}
		},
		function (error, response, body) {
			  var reply, err, success;
			  if (!error && response.statusCode == 200) {
			    reply = JSON.parse(body);
			    success = reply.success;
			  }
			  if (error || response.statusCode != 200 || reply.success == false) {
			  	err = new BufferAppError(error, response, reply);
			  	if (typeof Callback === 'undefined') throw err;
			  };
			  if (typeof Callback !== 'undefined') {
			  	Callback(err, success);
			  };
		  }
	);
};
