# golf-scoring

This is the repo for the scoring application

See getting started at https://loopback.io/getting-started.html

## Pre-requisites

Node.js >= 8.9.0 and a running instance of a MongoDB server is
required for the app to start.

Docker is required for running tests, make sure it is running if you want to run
the tests.

## Installation

Do the following to clone and start the project.

In case you have Docker installed on your system and don't want to manually
install MongoDB and Redis, you can run `npm run docker:start` to download their
images and start the servers. Otherwise, you can skip this command.

```sh
$ git clone https://github.com/paolob67/GolfScoring.git
$ cd GolfScoring
$ npm i
$ npm run docker:start
$ npm start
```


[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
