const fs = require('fs');
const zlib = require('zlib');

const READ_FILE_NAME = 'data.txt.gz';
const WRITE_FILE_NAME = 'data_gz.txt';

const readStream = fs.createReadStream(READ_FILE_NAME);
const writeStream = fs.createWriteStream(WRITE_FILE_NAME);

//const level = 9

//const brotli = zlib.createBrotliDecompress();
const gzip = zlib.createGunzip({
//  level,
});

const stream = readStream.pipe(gzip).pipe(writeStream);

stream.on('finish', () => {
  console.log('Done decompressing 😎');
});
