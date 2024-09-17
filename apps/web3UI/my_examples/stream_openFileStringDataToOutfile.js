// https://nodesource.com/blog/understanding-streams-in-nodejs/
//

const { Readable } = require('stream');

const fs = require('fs');
 
const dataString = fs.readFileSync('data.txt')
//console.log(dataString)
//process.exit()
//
const readable = Readable.from(generate());

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

async function * generate() {
//  yield 'hello';
//  yield 'streams';
}


let result = '';
readable.on('data', (chunk) => {
  result += chunk;
//  console.log('data:: ', chunk);
})

readable.on('end', () => {
  console.log('end');
  console.log('end', result);
  fs.writeFileSync('/tmp/data.txt', result)
})
