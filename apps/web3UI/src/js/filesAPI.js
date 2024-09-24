const express = require('express');
const fs = require('fs');
//const multer = require('multer');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3333;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({limit: '25mb'}))
app.use(bodyParser.json({limit: '25mb'}))

const processBody = async (body) => {
  const bodyObj = JSON.parse(body)
//console.log(bodyObj)

  const dirPath = '/tmp/files/' + bodyObj.addressData + '/' + bodyObj.addressUser
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log('mkdirSync files db :: path:', dirPath)
    }
  } catch (err) {
    console.error('mkdirSync files db :: ERROR ::', err)
  }   

  bodyObj.hashes.map((hash, index) => {
    console.log(
      "CREATE DIR FOR DATA/USER:",
      dirPath,
      bodyObj.hashes[index],
    )
    try {
      const filesHashPath = dirPath + '/filesHashData.json'
      fs.writeFileSync(
        filesHashPath,
        JSON.stringify(bodyObj.hashes),
      )
      const filesEncryptedDataPath = dirPath + '/filesEncryptedFilesData.json'
      fs.writeFileSync(
        filesEncryptedDataPath,
        JSON.stringify(bodyObj.encryptedFiles),
      )
    } catch (err) {
      console.error('mkdirSync files db :: ERROR ::', err)
    }
  })
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/stats', function (req, res, next) {
  const dirPath = '/tmp/files/' 
  const syncDataAddresses = []
  const syncUserAddresses = []
  //const allFilesHashData = {}
  fs.readdir(dirPath, { recursive: true }, (errror, files) => {
    const output = files.map((file, index) => {

      const [addressData, addressUser] = file.split("/")

      if(syncDataAddresses.indexOf(addressData) === -1) {
        syncDataAddresses.push(addressData)
      }
      //console.log(syncDataAddresses)

      if (file.match(/^0x[0123456789abcdef]+\/0x[0123456789abcdef]+$/i)) {
      }

      if (file.match(/filesHashData.json$/i)) {
        //allFilesHashData{addressData}{addressUser} = JSON.parse(fs.readFileSync(dirPath + file).toString('utf8'))
        console.log(
          JSON.parse(fs.readFileSync(dirPath + file).toString('utf8'))
          //(dirPath + file + '/filesHashData.json')
          //fs.readFileSync(dirPath + file + '/filesHashData.json')
        )
        return { addressData, addressUser }
      } 

      /*
      if (file.match(/^0x[0123456789abcdef]+\/0x[0123456789abcdef]+$/i)) {
        const [addressData, addressUser] = file.split("/")
        const  dataFiles = fs.readdirSync(dirPath  + '/' + file)
        //console.log(fs.readFileSync(dirPath + '/' + file + '/filesHashData.json'))
        //console.log(dataFiles)
       // filesHashData
        return { addressData, addressUser }
      }
      */
    })
    res.status(200).json({
      'info': 'getStats',
      files: JSON.stringify(files, null, 2),
      output,
    })
  }) 
})

app.post('/publishNew', function (req, res, next) {
  let body = ''
  console.log('/publishNew', req.body)
//  const addressUser
//  const addressData
  let count = 0;
  req.pipe(fs.createWriteStream('/tmp/uploadFile'));
  req.on('data', (chunk) => {
    count++
    console.log(count, chunk);
    body += chunk
  });
  req.on('end', (next) => {
    const message = `data published!`
    //res.send(message);
    res.status(200).send(message)
    console.log("message:", message)
    //console.log("return body data:", body)
    processBody(body)
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
      JSON.stringify(req.body.data),
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
