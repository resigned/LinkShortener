var express = require('express')
var app = express()

var redis = require("redis"),
    client = redis.createClient();

app.use(express.static('static'));

app.get('/add/:id/:link', function(req, res) {
    client.exists(req.params.id, function(err, reply) {
      if (reply === 1) {
        res.send("short link is already used :(");
      } else {
        client.set(req.params.id, req.params.link);
        res.send("Successfully created short link!");
      }
    });
});

app.get('/:id',function(req, res) {
    var id = req.params.id;
    client.exists(id, function(err, reply) {
    if (reply === 1) {
      client.get(id, function(err, reply) {
          res.redirect(reply);
      });
    } else {
        res.send("Could not find short link");
    }
});
});

app.listen(8080);
