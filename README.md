node-bufferapp
==============

Node.js SDK for [Buffer](http://bufferapp.com) APIs

Installation
------------

```
npm install node-bufferapp
```

Usage
-----

```javascript
var express = require('express')
, app = express()
,BufferApp = require('node-bufferapp');

var bufferapp = new BufferApp({
    clientID : YOUR_APP_CLIENT_ID,
    clientSecret : YOUR_APP_CLIENT_SECRET,
    callbackURL : YOUR_APP_CALLBACK_URL
});

app.get('/auth', function(req, res) {
    // Your user has to authorize your app to use his/her account
    res.redirect(bufferapp.getAuthorizationURI());
});

app.get('YOUR_CALLBACK_PATH', function(req, res) {
    // Extract the code that would have been sent as a query parameter to your callback URL
    var code = req.query.code;
    bufferapp.login(code, function(error, user) {
        // user is an instance of BufferUser which can then be used to make authorized api calls
        user.getInfo(function(err, info) {
            console.log(JSON.stringify(info));
        });
    });
});
```

The complete API documentation is in [docs](http://shrikrishnaholla.github.io/node-bufferapp/docs)

Development
-----------
```
$git clone https://github.com/shrikrishnaholla/node-bufferapp.git
$cd node-bufferapp
$npm install
```

#### Running tests

- Register a test application [here](http://bufferapp.com/developers/apps/create) (For login test)
- Get the Client ID, Client Secret, Callback URL, Test Access token
- Add these information to tests/config.js
- Run ```$npm test```

###### Note
The tests include one for login, which runs a local server. You need to access it through a web browser and complete the authorization process to finish the test

#### Generating Test Coverage Report
Needs [JSCoverage](http://siliconforks.com/jscoverage/) and [Mocha](http://visionmedia.github.io/mocha/#suite-specific-timeouts)
```
$make coverage
```
Then go to `http://localhost:YOUR_TEST_SERVER_PORT` to complete the login test

#### Generating Documentation
Needs [Docco](http://jashkenas.github.io/docco/)
```
$make doc
```
