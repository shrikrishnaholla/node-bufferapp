var http = require('http');

function BufferAppError (error, response, replyObj) {
	if (replyObj.success === false) {
		switch(replyObj.code) {
		case 403	: 	this.code = replyObj.code;
						this.message = "Permission denied.";
						break;

		case 404	: 	this.code = replyObj.code;
						this.message = "Endpoint not found.";
						break;

		case 405	: 	this.code = replyObj.code;
						this.message = "Method not allowed.";
						break;

		case 1000	: 	this.code = replyObj.code;
						this.message = "An unknown error occurred.";
						break;

		case 1001	: 	this.code = replyObj.code;
						this.message = "Access token required.";
						break;

		case 1002	: 	this.code = replyObj.code;
						this.message = "Not within application scope.";
						break;

		case 1003	: 	this.code = replyObj.code;
						this.message = "Parameter not recognized.";
						break;

		case 1004	: 	this.code = replyObj.code;
						this.message = "Required parameter missing.";
						break;

		case 1005	: 	this.code = replyObj.code;
						this.message = "Unsupported response format.";
						break;

		case 1006	: 	this.code = replyObj.code;
						this.message = "Parameter value not within bounds.";
						break;

		case 1010	: 	this.code = replyObj.code;
						this.message = "Profile could not be found.";
						break;

		case 1011	: 	this.code = replyObj.code;
						this.message = "No authorization to access profile.";
						break;

		case 1012	: 	this.code = replyObj.code;
						this.message = "Profile did not save successfully.";
						break;

		case 1013	: 	this.code = replyObj.code;
						this.message = "Profile schedule limit reached.";
						break;

		case 1014	: 	this.code = replyObj.code;
						this.message = "Profile limit for user has been reached.";
						break;

		case 1015	: 	this.code = replyObj.code;
						this.message = "Profile could not be destroyed.";
						break;

		case 1016	: 	this.code = replyObj.code;
						this.message = "Profile buffer could not be emptied.";
						break;

		case 1020	: 	this.code = replyObj.code;
						this.message = "Update could not be found.";
						break;

		case 1021	: 	this.code = replyObj.code;
						this.message = "No authorization to access update.";
						break;

		case 1022	: 	this.code = replyObj.code;
						this.message = "Update did not save successfully.";
						break;

		case 1023	: 	this.code = replyObj.code;
						this.message = "Update limit for profile has been reached.";
						break;

		case 1024	: 	this.code = replyObj.code;
						this.message = "Update limit for team profile has been reached.";
						break;

		case 1025	: 	this.code = replyObj.code;
						this.message = "Update was recently posted, can't post duplicate content.";
						break;

		case 1026	: 	this.code = replyObj.code;
						this.message = "Update must be in error status to requeue.";
						break;

		case 1027	: 	this.code = replyObj.code;
						this.message = "Update must be in buffer and not custom scheduled in order to move to top.";
						break;

		case 1028	: 	this.code = replyObj.code;
						this.message = "Update soft limit for profile reached.";
						break;

		case 1029	: 	this.code = replyObj.code;
						this.message = "Event type not supported.";
						break;

		case 1030	: 	this.code = replyObj.code;
						this.message = "Media filetype not supported.";
						break;

		case 1031	: 	this.code = replyObj.code;
						this.message = "Media filesize out of acceptable range.";
						break;

		case 1032	: 	this.code = replyObj.code;
						this.message = "Unable to post image to LinkedIn group(s).";
						break;

		case 1034	: 	this.code = replyObj.code;
						this.message = "Cannot schedule updates in the past.";
						break;

		case 1033	: 	this.code = replyObj.code;
						this.message = "Comments can only be posted to Facebook at this time.";
						break;

		case 1042	: 	this.code = replyObj.code;
						this.message = "User did not save successfully.";
						break;

		case 1050	: 	this.code = replyObj.code;
						this.message = "Client could not be found.";
						break;

		case 1051	: 	this.code = replyObj.code;
						this.message = "No authorization to access client.";
						break;

		};
	} else if (error && error.code && error.message){
		this.code = error.code;
		this.message = error.message;
	} else if (response.statusCode != 200) {
		this.code = response.statusCode;
		this.message = http.STATUS_CODES[parseInt(response.statusCode)];
	}
}

exports.BufferAppError = BufferAppError;
