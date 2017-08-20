# activerules-middleware

[![NPM version](https://img.shields.io/npm/v/activerules-middleware.svg)](https://www.npmjs.com/package/activerules-middleware)
[![Build Status](https://travis-ci.org/bwinkers/activerules-middleware.svg?branch=master)](https://travis-ci.org/bwinkers/activerules-middleware)
[![Build status](https://ci.appveyor.com/api/projects/status/2ejpbpkek67wdosf?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/activerules-middleware)
[![Coverage Status](https://img.shields.io/coveralls/bwinkers/activerules-middleware.svg)](https://coveralls.io/github/bwinkers/activerules-middleware)
[![Dependency Status](https://img.shields.io/david/bwinkers/activerules-middleware.svg?label=deps)](https://david-dm.org/bwinkers/activerules-middleware)
[![devDependency Status](https://img.shields.io/david/dev/bwinkers/activerules-middleware.svg?label=devDeps)](https://david-dm.org/bwinkers/activerules-middleware#info=devDependencies)

Promised-based middleware to load configs.

## Overview

Loopback / Express middleware to support dynamic logic based on hostname or domain.
The configs for the host and domain are merged and available in the request past that point.
This is useful when supporting skinned versions versions of apps for multiple domains.

It was developed for use with Loopback 3 but should work with any Express based app.

## Install 

```
    npm install --save activerules-middleware
```

Add it early in the Loopback middleware.json initial phase:
```
    "initial": {
        "./middleware/performance-tracker": {},
        "activerules-middleware": {
            "params": "../../../common/ar"
        },
        "compression": {},
```
The *params* needs to be a a string representing the location of the ActiveRules configs.

The *params* directory must include two subdirectory: *host* and *site*.

## Testing

```
    npm test
```

### Public CI Testing Results:

#### CodeShip

https://app.codeship.com/projects/240160

#### Travis CI

https://travis-ci.org/bwinkers/activerules-middleware

#### Coveralls - test coverage

[![Coverage Status](https://coveralls.io/repos/github/bwinkers/activerules-middleware/badge.svg?branch=master)](https://coveralls.io/github/bwinkers/activerules-middleware?branch=master)

## Usage

Examples of the host and site configs can be found in the *test* directory.

### Hostname Config

* The site hostname must have a *.json* file for the root domain in the *host* directory.
* That file must define a *site* property, and th value must correspond to a *.json* file in the *site* directory.
* Any additional properties will be merged with values in the *site* config.
* This allows setting prod defaults in the *site* config and overriding them on a hostname basis.

### Site Config

The *site* config file is a free form JSON object. It's properties will be merged with the *host* file using Lodash.

## Request object changes
 
If a valid site is found the Express request object will have a *site* property added to it.