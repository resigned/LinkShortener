var express = require('express')
var app = express()

var redis = require("redis"),
    client = redis.createClient();

app.use(express.static('static'));

app.get('/test/:link', function(req, res) {
  res.send("image is set to " + req.params.image);
});

app.get('/:link',function(req, res) {
    var requestedLink = req.params.link;
    res.send(requestedLink);
});

app.listen(8080);
