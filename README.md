Secret Friend Front-End Project
===

### Pre-requisites:
* Node;
* NPM;
* Gulp global;
* Bower global;

### Install Node.js and NPM
https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager

### Install gulp and bower global:
```sh
sudo npm install gulp bower -g
```

### Install the Application:
Clone this repository:
```sh
git clone git@github.com:fabiohbarbosa/secretfriend_web.git
```

Install dependencies:
```sh
npm install && bower install
```

Run the application:
```sh
gulp server
```

Run the application tests:
```sh
gulp tests
```

Open the application:

[http://localhost:3000](http://localhost:3000)

### Deploy the Application:

Generate package:
```sh
gulp dist
```
*Available package in folder /dist*

### Available gulp tasks:
* server: Run application in developer environment
* serverMin: Run application in developer environment using minification files
* jshint: Validation javascript files
* inject: Inject css and javascript files into index.html
* inject-karma: Inject css and javascript files into karma.conf.js
* test: Run tests
* minify: Minify javascript and css files
* minify-js: Minify javascript files
* minify-css: Minify css files
* dist: generate zip file of application
* isDist: change environment to build with minification files
