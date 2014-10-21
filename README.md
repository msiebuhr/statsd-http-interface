statsd-http-interface
=====================

**☠ Warning - Only works on StatsD's master branch ☠**

(That is, you will need a release after `0.7.2` for this to work.)


Adds a HTTP front-end to [StatsD](http://github.com/etsy/statsd). Install this package along with StatsD and change the cofig thusly:

    {
      ...
      server: 'statsd-http-interface',
      // The server will open a HTTP interface on this port
      port: 8080,
      // Require a `token`-header to have this value before accepting any data.
      // token: 'SECRET'
    }

Sending data to the client can be done thusly:

    echo 'foo:0|c\nbar:1|c\nbaz:2|c' | \
      curl localhost:8080 --data-binary @- --header 'token: SECRET'

Why?
----

We really want to get metrics out of an environment where UDP traffic is denied
(hello, Heroku!). While it is possible to run a StatsD in each dyno, it denies
us all the nice aggregation-properties that StatsD would otherwise give us
across a server-farm.

License
-------

ISC
