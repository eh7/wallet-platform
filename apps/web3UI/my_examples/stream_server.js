// node: v0.10.7
// express: 3.4.4
var fs = require('fs');
var express = require('express');

var app = express();
app.post('/', function (req, res, next) {
  console.log("data uploaded")
  let count = 0;
  req.pipe(fs.createWriteStream('./uploadFile'));
  req.on('data', (chunk) => {
    count++
    console.log(count, chunk);
  });
  req.on('end', (next) => {
    console.log('end')
    next
  });
});

app.listen(3000);
