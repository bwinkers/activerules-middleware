# activerules-middleware
Loopback / Express middleware to support dynamic logic based on hostname or domain.
This is useful when supporting skinned versions versions of apps for multiple domains.

It was developed for use with Loopback 3 but should work with any Express based app.


In the Loopback middleware.json add it early in the initial phase:
```
  "initial": {
    "./middleware/performance-tracker": {},
    "activerules-middleware": {
        "params": "../../../common/ar"
    },
    "compression": {},
```
