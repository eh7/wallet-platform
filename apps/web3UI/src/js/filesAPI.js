const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3333;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.urlencoded({limit: '25mb'}))
app.use(bodyParser.json({limit: '25mb'}))

const objectsEqual = (o1, o2) =>
  Object.keys(o1).length === Object.keys(o2).length
    && Object.keys(o1).every(p => o1[p] === o2[p]);

const merge = (_array) => {
  const newArray = []
  _array.map((subArray) => {
    subArray.map((newItem) => {
      if (newArray.length === 0) {
        newArray.push(newItem)
      } else {
        let check = false
        newArray.map((checkItem, checkItemIndex) => {
          //console.log('check', checkItem, newItem, objectsEqual(checkItem, newItem))
          if (!check) {
            check = objectsEqual(checkItem, newItem)
          }
        })
        if (!check) {
          newArray.push(newItem)
        }
      }
    })
  })
  return newArray
}


/*
const merge = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a]; // copy to avoid side effects
  // add all items from B to copy C if they're not already present
  b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
  return c;
}
*/

const prepareSyncData = async (
  _allFilesHashes,
  _files,
  _syncDataAddresses,
  _filesHashData,
  _filesEncryptedFilesData,
) => {
  console.log("prepareSyncData")
  try {
    _syncDataAddresses.map((dataAddress) => {
      const allFileHashes = []
      //const uniqueFileHashes = []
      console.log('process dataAddress:', dataAddress)  
      //
      // WIP
      // get all fileHashes for this sync dataAddress
      // create a uniquie list of fileHashes for this sync  dataAddress
      // copy all sync fileHashes and encryptedFilesData to the sync directory for that sync data/user address
      //
      _allFilesHashes.map((dataPair, index) => {
        const pairRef = [
          dataPair.addressData +
          '/' +
          dataPair.addressUser
        ]

//      const encryptedFiles = _filesEncryptedFilesData[pairRef].map((encryptedDataFile, index) => {
//        encryptedDataFile.index = index
//        return encryptedDataFile
//      })
//console.log(encryptedFiles)

        if (_filesHashData[pairRef]) {
          allFileHashes.push(_filesHashData[pairRef])
        }
      })
      //console.log('allFileHashes', allFileHashes)
      //console.log('allFileHashes.length', allFileHashes.length)

      const uniqueFileHashes = merge(allFileHashes)
      //console.log(uniqueFileHashes)

      const latestFiles = []
      let i = 0
      uniqueFileHashes.map((hashes, index) => {
        const pairRef = hashes.addressData + '/' + hashes.addressUser

        console.log(hashes.index)
      
        const data = _filesEncryptedFilesData[pairRef][hashes.index]
        data.index = i
        i++
        latestFiles.push(data)

        console.log(Object.keys(data))
        console.log(data.iv)
//      data.filter((item) => {
//        console.log(item)
//      })

      //console.log('uniqueFileHashes', uniqueFileHashes[pairRef])
    })
//console.log(_filesEncryptedFilesData)

      console.log('uniqueFileHashes', uniqueFileHashes)
      console.log('latestFiles', latestFiles)

      const filePath = '/tmp/files/' + dataAddress + '/latestFilesData.json';
      fs.writeFileSync(
        filePath,
        JSON.stringify(latestFiles),
        "utf8",
      )
    })
  } catch (err) {
    console.error('prepareSyncData', err)
  } 
}

const processBody = async (body) => {
  const bodyObj = JSON.parse(body)

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

app.get('/latest/:dataAddress/:userAdddress', function (req, res, next) {
  try {
    const dirPath = '/tmp/files/' 
    const filePath = dirPath + req.params.dataAddress + '/latestFilesData.json';
//  const files = JSON.parse(fs.readFileSync(filePath).toString('utf8'))
//console.log(files)
//  console.log("WIP i::  Men at work :::::: latest files")

    const readStream = fs.createReadStream(filePath);

    console.log("file stream to client done")

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
 //     'Content-Disposition': 'attachment; filename="file.txt"'
    });

    readStream.pipe(res);
  
    readStream.on('error', (err) => {
      console.error(err);
      res.status(500).send({ message: 'Error streaming file' });
    });

    readStream.on('done', () => {
      console.log("file stream to client done")
    })
  } catch (err) {
    console.error('recieve get("/latest/:dataAddress/:userAdddress")', err)
  }

//  res.status(200).send(files)
//  res.status(200).json({
//    info: 'latest ' + req.params.dataAddress,
//    message: 'okay',
//    status: '200',
//    files1: "files1", 
//    files: files, 
//  })
})

app.get('/stats', function (req, res, next) {
  const dirPath = '/tmp/files/' 
  const syncDataAddresses = []
  const syncUserAddresses = []
  const filesHashes = []
  const filesHashesJson = []
  const filesHashData = []
  const filesEncryptedFilesData = []

  fs.readdir(dirPath, { recursive: true }, (errror, files) => {
    files.map((file, index) => {

      const [addressData, addressUser] = file.split("/")

      if (addressUser && syncUserAddresses.indexOf(addressUser) === -1) {
        syncUserAddresses.push(addressUser)
      }

      if(addressData && syncDataAddresses.indexOf(addressData) === -1) {
        syncDataAddresses.push(addressData)
      }

      if (addressData && addressUser) {
        const data = {addressData, addressUser}
        let check = false
        filesHashes.map((fileHash) => {
          if (fileHash.addressData === addressData && fileHash.addressUser === addressUser) {
            check = true
          }
        })
        if (!check) {
          filesHashes.push(data)
        }
      }

      if (file.match(/filesEncryptedFilesData.json$/i)) {
        filesEncryptedFilesData[
          addressData +
          '/' +
          addressUser
        ] = JSON.parse(fs.readFileSync(dirPath + file).toString('utf8'))
      }

      if (file.match(/filesHashData.json$/i)) {
        filesHashData[
          addressData +
          '/' +
          addressUser
        ] = JSON.parse(fs.readFileSync(dirPath + file).toString('utf8'))
      } 

      if (file.match(/^0x[0123456789abcdef]+\/0x[0123456789abcdef]+$/i)) {
        return { addressData, addressUser }
      }

    })
    //console.log({filesHashes})
    //console.log({filesHashData})
    //console.log({filesEncryptedFilesData})

    prepareSyncData(
      filesHashes,
      files,
      syncDataAddresses,
      filesHashData,
      filesEncryptedFilesData,
    ) 

    res.status(200).json({
      'info': 'getStats',
      files,
      syncUserAddresses,
      syncDataAddresses,
      filesHashes,
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
