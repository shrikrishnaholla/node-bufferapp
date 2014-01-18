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

- First, create a Buffer Client

```
var BufferApp = require('node-bufferapp');
var bufferapp = new BufferApp({
    clientID : YOUR_APP_CLIENT_ID,
    clientSecret : YOUR_APP_CLIENT_SECRET,
    callbackURL : YOUR_APP_CALLBACK_URL
});
```

- Then, create a new user by logging him in

```
bufferapp.login(function(user){
  console.log(user.profile);
});
```

The complete API documentation is in [docs](http://shrikrishnaholla.github.io/node-bufferapp/docs)
