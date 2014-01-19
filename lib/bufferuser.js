// BufferUser class
// ----------------
// Class for holding and querying a Buffer user's details
/** 
 * @class BufferUser
 * @param {object} profile
 * @param {String} accessToken
 **/
function BufferUser (accessToken, baseURL) {
	this._token = accessToken;
	this.__api_base = baseURL;
}


// User
// ----
// A user represents a single Buffer user account. All functions under this category pass a json object
// to their callback in lieu with the documentation at http://bufferapp.com/developers/api/user .
// Find out more [here](user.html)  
//
// get Info
// --------
// Get a user's basic info. Complete details [here](user.html#section-2)
BufferUser.prototype.getInfo = require('./user').getInfo;


// Profile
// -------
// A Buffer profile represents a connection to a single social media account. All functions under this category
// pass a json object to the callback in lieu with
// the documentation at http://bufferapp.com/developers/api/profiles .
// Find out more [here](profiles.html)   
var profiles = require('./profiles');

// get All Profiles
// ----------------
// Get all social media profiles connected to a users account. Complete details [here](profiles.html#section-2)
BufferUser.prototype.getAllProfiles = profiles.getAllProfiles;

// get Profile
// -----------
// Get details of the single specified social media profile. Complete details [here](profiles.html#section-4)
BufferUser.prototype.getProfile = profiles.getProfile;

// get Schedule
// ------------
// Get  details of the posting schedules associated with a social media profile.
// Complete details [here](profiles.html#section-6)
BufferUser.prototype.getSchedule = profiles.getSchedule;

// set Schedule
// ------------
// Set the posting schedules for the specified social media profile.
// Complete details [here](profiles.html#section-8)
BufferUser.prototype.setSchedule = profiles.setSchedule;


// Updates
// -------
// An update represents a single post to a single social media account.
// All functions under this category pass a json object to the callback in lieu with
// the documentation at http://bufferapp.com/developers/api/updates .
// Find out more [here](updates.html)   
var updates = require('./updates');

// get One Update
// --------------
// Get a single social media update.
// Complete details [here](updates.html#section-2)
BufferUser.prototype.getOneUpdate = updates.getOneUpdate;

// get Buffered Updates
// -------------------
// Get an array of updates that are currently in the buffer for an individual social media profile.
// Complete details [here](updates.html#section-4)
BufferUser.prototype.getBufferedUpdates = updates.getBufferedUpdates;

// get Sent Updates
// ----------------
// Get an array of updates that have been sent from the buffer for an individual social media profile.
// Complete details [here](updates.html#section-6)
BufferUser.prototype.getSentUpdates = updates.getSentUpdates;

// get Interactions
// ----------------
// Get the detailed information on individual interactions
// with the social media update such as favorites, retweets and likes.
// Complete details [here](updates.html#section-8)
BufferUser.prototype.getInteractions = updates.getInteractions;

// reorder Updates
// ---------------
// Edit the order at which statuses for the specified social media profile will be sent out of the buffer.
// Complete details [here](updates.html#section-10)
BufferUser.prototype.reorderUpdates = updates.reorderUpdates;

// shuffle Updates
// ---------------
// Randomize the order at which statuses for the specified social media profile
// will be sent out of the buffer.
// Complete details [here](updates.html#section-12)
BufferUser.prototype.shuffleUpdates = updates.shuffleUpdates;

// create Status
// -------------
// Create one or more new status updates.
// Complete details [here](updates.html#section-14)
BufferUser.prototype.createStatus = updates.createStatus;

// update Status
// -------------
// Edit an existing, individual status update.
// Complete details [here](updates.html#section-16)
BufferUser.prototype.updateStatus = updates.updateStatus;

// share One Status
// ----------------
// Immediately shares a single pending update and recalculates times for updates remaining in the queue.
// Complete details [here](updates.html#section-18)
BufferUser.prototype.shareOneStatus = updates.shareOneStatus;

// delete One Status
// -----------------
// Permanently delete an existing status update.
// Complete details [here](updates.html#section-20)
BufferUser.prototype.deleteOneStatus = updates.deleteOneStatus;

// move To Top
// -----------
// Move an existing status update to the top of the queue and recalculate times for all updates in the queue
// Complete details [here](updates.html#section-22)
BufferUser.prototype.moveToTop = updates.moveToTop;


BufferUser.prototype.getConfigInfo = require('./info').getConfigInfo;

exports.BufferUser = BufferUser;
