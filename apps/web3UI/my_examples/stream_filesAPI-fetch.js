const { Stream, Readable } = require('stream');

const request = require('request');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fs = require('fs');

const dataString = fs.readFileSync('data.txt')
//const dataString = "fs.readFileSync('data.txt')"
//const dataString = fs.readFileSync('test.txt')

const readable = Readable.from([]);

async function post() {
  const r1 = await fetch('http://localhost:3333/publishNew', {
    method: 'POST',
    body: dataString,
  });
  console.log({
    status: r1.status,
    statusText: r1.statusText, 
    urlList: r1.urlList,
    body: r1.body,
  })
/*
  const r = request.post(
    { 
      url: "http://localhost:3333/publishNew",
      //form:    { mes:"heydude" }
    },
    (error, response, body) => {
    console.error('error:', error)
    console.log('statusCode:', response && response.statusCode)
    console.log('body:', body)
  })

//console.log('r1', r1)
//console.log('r', r)

  readable.pipe(r);

  const chunkSize = 1024;
  const buffer = dataString;
  const chunks = [];
  for (let i = 0; i < buffer.length; i += chunkSize) {
    chunks.push(buffer.slice(i, i + chunkSize));
    readable.push(
      buffer.slice(i, i + chunkSize)
    )
  }

  readable.on('error', (error) => {
    console.error("ERRRROOORR", error)
  })

  var upload_progress = 0;
  let result = '';
  readable.on('data', (chunk) => {
    result += chunk;
    upload_progress += chunk.length
    console.log(new Date(), upload_progress);
  })

  readable.on('end', () => {
    console.log('end');
  })
*/
}

post()
