var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('blogapp', ['blogapp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/blogapp', function (req, res) {
  console.log('I received a GET request');

  db.blogapp.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/blogapp', function (req, res) {
  console.log(req.body);
  db.blogapp.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/blogapp/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.blogapp.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/blogapp/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.blogapp.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/blogapp/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.blogapp.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {bname: req.body.bname, articleno: req.body.articleno, article: req.body.article}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(8383);
console.log("Server running on port 8383");