# Movies App Demo
[![Actions Status](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/badge/iepsen/movies-app-demo)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/{owner}/{repo})

This repository contains the source code for http://movies-app-demo.s3-website-us-west-2.amazonaws.com.

It uses [React](https://reactjs.org/) with [webpack](https://webpack.js.org/) to build a Single Page Application.

![demo](https://user-images.githubusercontent.com/228328/47033749-ff40f680-d14b-11e8-8a17-6b452b8b7df4.gif)

## Resolutions
Resolutions above 1024 should work. Also optimized for HD and Full HD TV resolutions.

## Setting up
### Prerequisites
1. Git
1. Node: versions v6.14.4, v8.12.0, v9.11.2, v10.12.0, 11.10.1, v12.4.0 are tested and running as expected. Any versions for v9.x, v10.x, v11.x and v12.x should work
1. Yarn: https://yarnpkg.com/lang/en/docs/install/

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
This project flows the [Github Actions](https://github.com/features/actions) pipeline to test, build and deploy it on Amazon AWS if all tests pass.

See the [configuration file](https://github.com/iepsen/movies-app-demo/blob/master/.github/workflows/ci.yml) for more details.

## Documentation
This [Documentation](https://iepsen.github.io/movies-app-demo/) describes the classes and modules. Navigate on the right panel to see details about each class.
