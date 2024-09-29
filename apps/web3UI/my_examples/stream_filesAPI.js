const { Stream, Readable } = require('stream');

const request = require('request');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fs = require('fs');

//const dataString = fs.readFileSync('data.txt')
const dataString = fs.readFileSync('test.txt')

const readable = Readable.from([]);

//const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
const r = request.post("http://localhost:3333/publishNew", (error, response, body) => {
  console.error('error:', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('body:', body)
})

readable.pipe(r);

const chunkSize = 1024;
const buffer = dataString;
const chunks = [];
for (let i = 0; i < buffer.length; i += chunkSize) {
  chunks.push(buffer.slice(i, i + chunkSize));
  readable.push(
    buffer.slice(i, i + chunkSize)
  )
//  console.log(buffer.slice(i, i + chunkSize))
}

/*
async function * generate() {
//  yield 'hello';
//  yield 'streams';
}
*/

readable.on('error', (error) => {
  console.error("ERRRROOORR", error)
})

var upload_progress = 0;
let result = '';
readable.on('data', (chunk) => {
  result += chunk;
//  console.log('data:: ', chunk);
  upload_progress += chunk.length
  console.log(new Date(), upload_progress);
})

readable.on('end', () => {
  console.log('end');
//  console.log('end', result);
//  fs.writeFileSync('/tmp/data.txt', result)
//  process.exit()
//  r.status(200).end()
})
