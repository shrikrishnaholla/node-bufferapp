function BufferUser (accessToken) {
	this._token = accessToken;
}

BufferUser.prototype.getInfo = require('user').getInfo;

var profiles = require('./profiles');
BufferUser.prototype.getAllProfiles = profiles.getAllProfiles;
BufferUser.prototype.getProfile = profiles.getProfile;
BufferUser.prototype.getSchedule = profiles.getSchedule;
BufferUser.prototype.setSchedule = profiles.setSchedule;

var updates = require('./updates');
BufferUser.prototype.getOneUpdate = updates.getOneUpdate;
BufferUser.prototype.getBufferedUpdates = updates.getBufferedUpdates;
BufferUser.prototype.getSentUpdates = updates.getSentUpdates;
BufferUser.prototype.getInteractions = updates.getInteractions;
BufferUser.prototype.reorderUpdates = updates.reorderUpdates;
BufferUser.prototype.shuffleUpdates = updates.shuffleUpdates;
BufferUser.prototype.createStatus = updates.createStatus;
BufferUser.prototype.updateStatus = updates.updateStatus;
BufferUser.prototype.shareOneStatus = updates.shareOneStatus;
BufferUser.prototype.deleteOneStatus = updates.deleteOneStatus;
BufferUser.prototype.moveToTop = updates.moveToTop;

BufferUser.prototype.getConfigInfo = require('./info').getConfigInfo;

exports.BufferUser = BufferUser;
