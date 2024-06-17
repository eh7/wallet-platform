const path = require('path');
const fs = require('fs');

const joinedJson = {};

const directoryPath = path.join(__dirname);
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  files.forEach(function (file) {
    if (file !== 'join.js' && file !== 'All.json') {
      const json = require('./' + file);
      const filename = file.replace('.json', '');
      //console.log(filename);
      //console.log(file); 
      joinedJson[filename] = json;
    }
  });
  //console.log(joinedJson);

  const filepath = __dirname + '/All.json';
  fs.writeFile(
    filepath,
    JSON.stringify(joinedJson, null, 2),
    err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
});
