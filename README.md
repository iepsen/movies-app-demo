# Movies App Demo
[![CircleCI](https://circleci.com/gh/iepsen/movies-app-demo.svg?style=svg)](https://circleci.com/gh/iepsen/movies-app-demo)

This repository contains the source code for http://movies-app-demo.s3-website-us-west-2.amazonaws.com/.

## Resolutions
Resolutions above 1024 should work. Also optimized for HD and Full HD TV resolutions.

## Setting up
### Prerequisites
1. Git
1. Node: versions v6.14.4, v8.12.0, v9.11.2, v10.12.0 are tested and running as expected. Any versions for v9.x and v10.x should work
1. Yarn: https://yarnpkg.com/lang/en/docs/install/#mac-stable

### Instalation
1. `git clone https://github.com/iepsen/movies-app-demo.git`
1. cd `movies-app-demo`
1. `yarn`

### Running
1. `yarn start` 
>`yarn start` uses `webpack-dev-server` with default configuration and will load on port 8080.

### Tests
1. `yarn test`
> Only presentation layer components are covered. More tests could be added soon.

## Hosting
This project flow the [CircleCI](https://circleci.com/product/#how-it-works) pipeline to test, build and, if tests are successful, deploy it on Amazon AWS.

She the [configuration file](https://github.com/iepsen/movies-app-demo/blob/master/.circleci/config.yml) for more details.