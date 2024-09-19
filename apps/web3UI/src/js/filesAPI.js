const express = require('express');
const fs = require('fs');
//const multer = require('multer');
const app = express();
const bodyParser = require('body-parser')
const port = 3333;

app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({limit: '25mb'}))
//app.use(bodyParser.json({limit: '25mb'}))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/publishNew', function (req, res, next) {
  let count = 0;
  req.pipe(fs.createWriteStream('/tmp/uploadFile'));
  req.on('data', (chunk) => {
    count++
    console.log(count, chunk);
  });
  req.on('end', (next) => {
    const message = `data published!`
    //res.send(message);
    res.status(200).send(message)
    console.log(message)
    //next
  });
});


app.post('/publish', (req, res) => {
  if (!req.body.address) {
    return res.status(400).json({ error: 'No body address' });
  }
  if (!req.body.addressData) {
    return res.status(400).json({ error: 'No body addressData' });
  }
  if (!req.body.sigData) {
    return res.status(400).json({ error: 'No body sigData' });
  }
  if (!req.body.data) {
    return res.status(400).json({ error: 'No body data' });
  }
  const directoryPath = '/tmp/filesSync/' + req.body.addressData;
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
      console.log(`Directory '${directoryPath}' created.`);
    } else {
      console.log(`Directory '${directoryPath}' exists.`);
    }
  } catch (err) {
    console.error(err);
  }
  try {
    fs.writeFileSync(
      directoryPath  + '/' + req.body.addressData + ".json",
      JSON.stringify(req.body.data,null,2),
      "utf8",
    );
  } catch (err) {
    console.error(err);
console.log(req.body.data)
  }
  res.json({
    message: 'sync data published successfully',
    address: req.body.address,
    address: req.body.addressData,
    sigData: req.body.sigData,
    data: req.body.data,
  });
});

app.get('/retrieve', (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    message: 'sync data retrieve',
    filename: req.body.address,
    filename: req.body.addressData,
  });
});
