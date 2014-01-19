var libpath = process.env['NODE_BUFFERAPP_COV'] ? '../lib-cov' : '../lib';
var BufferUser = require(libpath + '/bufferuser').BufferUser
, config = require('./config')
, assert = require('assert');

// force the test environment to 'test'
process.env.NODE_ENV = 'test';

describe('BufferUser', function() {
  this.timeout(10000);
  describe(':Constructor', function() {
  	it(':Should return a BufferUser object', function() {
      assert(config.accessToken, undefined, 'Access Token not configured. Needed to create BufferUser object');
      assert(config.api_base, undefined, 'Buffer API base not configured. Needed to create BufferUser object');
  		bufferuser = new BufferUser(config.accessToken, config.api_base);
  	});
  });

  describe(':getInfo', function() {
  	it(":Should get a user's basic info", function(done) {
  		bufferuser.getInfo(done);
  	});
  });

  describe(':getAllProfiles', function() {
  	it(':Should get all social media profiles connected to a users account.', function(done) {
  		bufferuser.getAllProfiles(function(error, profiles) {
  			if (error) done(error);
  			else {
  				social_profile_id = profiles[0].id;
  				if (typeof social_profile_id == 'undefined') done('No social profiles associated with given user');
  				else done();
  			}
  		});
  	});
  });

  describe(':getProfile', function() {
  	it(':Should get details of the single specified social media profile.', function(done) {
  		bufferuser.getProfile(social_profile_id, done);
  	});
  });

  describe(':getSchedule', function() {
  	it(':Should returns details of the posting schedules of a social media profile.', function(done) {
  		bufferuser.getSchedule(social_profile_id, function(error, schedule) {
  			if (error) done(error);
  			else {
  				current_schedule = schedule;
  				done();
  			}
  		});
  	});
  });

  describe(':setSchedule', function() {
  	it(':Should set the posting schedules for the specified social media profile.', function(done) {
  		bufferuser.setSchedule(social_profile_id, current_schedule, done);
  	});
  });

  describe(':getBufferedUpdates', function() {
  	it(':Should get an array of updates that are currently in the buffer for an individual social media profile.',
  		function(done) {
  		  bufferuser.getBufferedUpdates(social_profile_id, function(error, updates) {
  			if (error) done(error);
  			else {
  				if (updates.total > 0) {
  					status_update_id = updates.updates.pop().id;
  				};
  				done();
  			}
  		});
  	});
  });

  describe(':getSentUpdates', function() {
    it(':Should get an array of updates that have been sent from the buffer for an individual social media profile.',
      function(done) {
        bufferuser.getSentUpdates(social_profile_id, function(error, updates) {
        if (error) done(error);
        else {
          if (updates.total > 0 && typeof status_update_id == 'undefined') {
            status_update_id = updates.updates.pop().id;
          };
          done();
        }
      });
    });
  });

  describe(':getOneUpdate', function() {
    it(':Should get a single social media update.',
      function(done) {
        bufferuser.getOneUpdate(status_update_id, done);
    });
  });

  describe(':getInteractions', function() {
    it(':Should return the detailed information on individual interactions ' + 
      'with the social media update such as favorites, retweets and likes.',
      function(done) {
        bufferuser.getInteractions(status_update_id, 'retweets', done);
    });
  });

  describe(':reorderUpdates', function() {
    it(':Should edit the order at which statuses for the specified social media profile will be sent out of the buffer.',
      function(done) {
        bufferuser.reorderUpdates(social_profile_id, [status_update_id], done);
    });
  });

  describe(':shuffleUpdates', function() {
    it(':Should randomize the order at which statuses for the specified social media profile will be sent out of the buffer.',
      function(done) {
        bufferuser.shuffleUpdates(social_profile_id, done);
    });
  });

  describe(':createStatus', function() {
    it(':Should create one or more new status updates.',
      function(done) {
        bufferuser.createStatus('Testing node-bufferapp, a #nodejs sdk for #bufferapp', 
          [social_profile_id], function(error, new_status) {
        if (error) done(error);
        else {
          buffered_status_update_id = new_status.updates.pop().id;
          done();
        }
      });
    });
  });

  describe(':updateStatus', function() {
    it(':Should edit an existing, individual status update.',
      function(done) {
        bufferuser.updateStatus(buffered_status_update_id,
        'Testing node-bufferapp, a #nodejs sdk for #bufferapp. More details at http://shrikrishnaholla.in/node-bufferapp',
        done);
    });
  });

  describe(':deleteOneStatus', function() {
    it(':Should permanently delete an existing status update.',
      function(done) {
        bufferuser.createStatus('Testing for deletion of status messages', 
          [social_profile_id], function(error, status_to_delete) {
        if (error) done(error);
        else {
          bufferuser.deleteOneStatus(status_to_delete.updates.pop().id, done);
        }
      });
    });
  });

  describe(':moveToTop', function() {
    it(':Should move an existing status update to the top of the queue',
      function(done) {
        bufferuser.moveToTop(buffered_status_update_id, done);
    });
  });

  describe(':shareOneStatus', function() {
    it(':Should immediately share a single pending update',
      function(done) {
        bufferuser.shareOneStatus(buffered_status_update_id, done);
    });
  });
});
