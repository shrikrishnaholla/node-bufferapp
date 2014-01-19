var http = require('http');
var util = require('util');

// BufferError class
// -----------------
// It accepts the relevant input objects (`error`, `response`, `replyObj`),
// determines the cause of the error, its error code, the error message and creates an
// object containing the relevant error message
/**
 * @class BufferAppError
 * @param {object} error
 * @param {object} response
 * @param {object} replyObj
 **/
function BufferAppError (error, response, replyObj) {
	if (typeof replyObj !== 'undefined' && replyObj != null) {
		if (replyObj.error !== undefined) {
			this.error = replyObj.error;
		};
		if (replyObj.code !== undefined) {
			this.code = replyObj.code;	
		};
		if (replyObj.message !== undefined) {
			this.message = replyObj.message;
		};
	} else if (typeof error !== 'undefined' && error != null){
		this.code = error.name;
		this.message = error.message;
	} else if (typeof response !== 'undefined' && response !== null && response.statusCode != 200) {
		this.code = response.statusCode;
		this.message = http.STATUS_CODES[parseInt(response.statusCode)];
	}
}

util.inherits(BufferAppError, Error);

exports.BufferAppError = BufferAppError;
