# activerules-middleware

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