# activerules-middleware
Loopback / Express middleware to support dynamic logic based on hostname or domain.
This is useful when supporting skinned versions versions of apps for multiple domains.

It was developed for use with Loopback 3 but should work with any Express based app.

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