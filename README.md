# RSS Feed App [![Build Status](https://travis-ci.org/wix/express-angular-rss-feed-app.png?branch=master)](https://travis-ci.org/wix/express-angular-rss-feed-app)
> Node.js, MongoDB, Angular.js, Karma and Grunt

### About
A Wix App, RSS Feed, demonstrating how to build a production ready app. Client & Server from scratch using Node.js server & Wix client side libraries.

### Intro

This app is built using the same structure and concept as the [RSS Feed on Google App Engine](https://github.com/wix/wix-gae-rss-feed-app) but uses Node.js as it's backend. The client side (html/js/css) was built using Angular.js and Karma for testing.

This project is set to work on your local machine using express.js server and a local MongoDB database.

### Setup

#### How To Install

Make sure you have npm, node and MongoDB installed:

```bash
node -v
npm -v
mongo --version
```

If you need to install node or npm follow [these steps](https://gist.github.com/isaacs/579814).

If you need to install MongoDB run the following:

```bash
brew update
brew install mongodb
```

Start your MongoDB by running:

```bash
mongod
```

Now, we are ready to install the app dependencies by running the following at the parent directory of your app:

```bash
npm install
```

This will create a node_modules directory including the app dependencies.

Change the APP_SECRET inside the authentication.js class to your app secret.

Run grunt dist

```bash
grunt dist
```

This will create the app minified js and css files.

Now start the app by running:

```bash
node app
```

In order to run the tests run the following:
```bash
karma start karma.conf.js
```


## License

Copyright (c) 2014 Wix.com, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
