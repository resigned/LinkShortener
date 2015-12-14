var express = require('express')
var app = express()

var redis = require("redis"),
    client = redis.createClient();

app.use(express.static('static'));
/*
Test to add url to redis database
*/
app.get('/add/:id/:link', function(req, res) {
    client.exists(req.params.id, function(err, reply) {
      if (replsy === 1) {
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
        res.redirect('/');
    }
});
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/app', function(req, res){
  var link = req.body.link;
  var id = generateID();
  var isUrl = isURL(link);
  console.log(req.body);
  if(isUrl){
    client.set(id, link);
    res.setHeader("Content-Type", "text/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({'Link':link,'GeneratedID':id}));
    console.log(id);
  } else {
    res.setHeader("Content-Type", "text/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({'error':'Not a valid link!'}));
  }

  });

app.listen(3000);

function generateID(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var isUnique = true;

  for( var i=0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      client.exists(text, function(err, reply) {
        if (reply === 1) {
            isUnique = false;
        }
      });

      if(isUnique){
        return text;
      } else {
        generateID();
      }
}

function isURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}
