var http = require('http');

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
	if (replyObj.success === false) {
		this.code = replyObj.code;
		this.message = replyObj.message;
	} else if (error && error.code && error.message){
		this.code = error.code;
		this.message = error.message;
	} else if (response.statusCode != 200) {
		this.code = response.statusCode;
		this.message = http.STATUS_CODES[parseInt(response.statusCode)];
	}
}

exports.BufferAppError = BufferAppError;
