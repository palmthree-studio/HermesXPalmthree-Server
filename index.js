/* Coded by Younès Elab @ Palmthree Studio, please don't reuse this code without my express permission */
const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

// Cross Domain Origin Setup
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
      res.send(200);
  } else {
      next();
  }
};
app.use(allowCrossDomain);
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, this app was made by Younès Elab @ Palmthree Studio !')
});

app.get('/question', (req, res) => {
  // The strategy here will be to send one question after another. We want to send only the piece of information that our client need.
  // Let's go :
  // Get the questionID that the client asked
  var questionID = req.query.id
  // read file and make object
  var questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
  // send the good object
  var question = questions[questionID];
  res.send(question);
});

app.get('/result', (req, res) => {
  // Get the good answer count from the client
  var goodAnswerCount = req.query.count
  // read file and make object
  var results = JSON.parse(fs.readFileSync('results.json', 'utf8'));
  // send the good object
  var finalResult = results[goodAnswerCount];
  res.send(finalResult);
});


app.get('/product', (req, res) => {
  // Here we have only one product, so it will be easy. 😊
  // Get the product ID from the client
  var productID = req.query.id
  // read file and make object
  var products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  // send the good object
  var product = products[productID];
  res.send(product);
});

app.listen(port, () => {
  console.log(`Hermès app listening on port ${port}!`)
});