node-bufferapp
==============

Node.js SDK for Buffer APIs http://bufferapp.com

Installation
------------

```
npm install node-bufferapp
```

Usage
-----

- First, create a Buffer Client
  ```javascript
  var BufferApp = require('node-bufferapp');
  var bufferapp = new BufferApp({
  	clientID : YOUR_APP_CLIENT_ID,
  	clientSecret : YOUR_APP_CLIENT_SECRET,
  	callbackURL : YOUR_APP_CALLBACK_URL
  });
  ```
- Then, create a new user by logging him in
  ```javascript
  bufferapp.login(function(user){
    console.log(user.profile);
  });
  ```

The complete API documentation is in [docs](http://shrikrishnaholla.github.io/node-bufferapp/docs)
