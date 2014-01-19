var BufferAppError = require('./error').BufferAppError;
var request = require('request');

// get Config Info
// ---------------
// Returns an object with the current configuration that Buffer is using, including supported services,
// their icons and the varying limits of character and schedules.
// Takes a Callback to which the JSON response is sent along with an [error object](error.html), if any  
// A sample response, taken from http://bufferapp.com/developers/api/info is 
// ```javascript
// {
//   "services":{
//     "twitter":{
//       "types":{
//         "profile":{
//           "name":"Twitter",
//           "character_limit":140,
//           "schedule_limit":288,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/twitter-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/twitter-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/twitter-64x64.png"
//           },
//           "supported_interactions":[
//             "favorites",
//             "mentions",
//             "retweets"
//           ]
//         }
//       },
//       "urls":{
//         "user":"https:\/\/twitter.com\/",
//         "hashtag":"https:\/\/twitter.com\/#!\/search?q=%23",
//         "cashtag":"https:\/\/twitter.com\/#!\/search?q=%24"
//       }
//     },
//     "facebook":{
//       "types":{
//         "profile":{
//           "name":"Facebook",
//           "character_limit":5000,
//           "schedule_limit":5,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/facebook-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/facebook-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/facebook-64x64.png"
//           },
//           "supported_interactions":[
//             "likes",
//             "comments"
//           ]
//         },
//         "page":{
//           "name":"Facebook Page",
//           "character_limit":5000,
//           "schedule_limit":5,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/facebook-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/facebook-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/facebook-64x64.png"
//           },
//           "supported_interactions":[
//             "likes",
//             "comments"
//           ]
//         }
//       },
//       "urls":{
//         "user":"https:\/\/www.facebook.com\/"
//       }
//     },
//     "linkedin":{
//       "types":{
//         "profile":{
//           "name":"LinkedIn",
//           "character_limit":700,
//           "schedule_limit":25,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-64x64.png"
//           },
//           "supported_interactions":[
//             "comments",
//             "likes"
//           ]
//         },
//         "group":{
//           "name":"LinkedIn Group",
//           "character_limit":200,
//           "schedule_limit":100,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/linkedin-64x64.png"
//           },
//           "supported_interactions":[
//             "comments",
//             "likes"
//           ]
//         }
//       },
//       "urls":{
//         "user":"http:\/\/www.linkedin.com\/search\/fpsearch?type=people&keywords="
//       }
//     },
//     "appdotnet":{
//       "types":{
//         "profile":{
//           "name":"App.net",
//           "character_limit":256,
//           "schedule_limit":288,
//           "icons":{
//             "16":"http:\/\/static.bufferapp.com\/images\/services\/appdotnet-alpha-16x16.png",
//             "32":"http:\/\/static.bufferapp.com\/images\/services\/appdotnet-alpha2-32x32.png",
//             "64":"http:\/\/static.bufferapp.com\/images\/services\/appdotnet-alpha-64x64.png"
//           },
//           "supported_interactions":[
            
//           ]
//         }
//       },
//       "urls":{
//         "user":"https:\/\/alpha.app.net\/",
//         "hashtag":"https:\/\/alpha.app.net\/hashtags\/"
//       }
//     }
//   },
//   "media":{
//     "picture_size_min":0,
//     "picture_size_max":5242880,
//     "picture_filetypes":[
//       "jpeg",
//       "jpg",
//       "gif",
//       "png"
//     ]
//   }
// }
// ```
/**
 * @function getConfigInfo
 * @param {function} Callback: @param {BufferAppError} error, @param {object} config
 **/
exports.getConfigInfo = function(Callback) {
	if (typeof Callback !== 'function') {
		throw new Error('Callback needed for getConfigInfo call');
	};
	request(this.__api_base + '/info/configuration.json?access_token=' + this._token.toString(), 
		function (error, response, body) {
			var config, err;
			if (!error && response.statusCode == 200) {
			  config = JSON.parse(body);
			};
			if (error || response.statusCode != 200 || config.success == false) {
				err = new BufferAppError(error, response, config);
			};
			Callback(err, config);
		}
	);
};
