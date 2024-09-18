const { Stream, Readable } = require('stream');

const fs = require('fs');

//const source = new Stream();
//source.readable = true;
 
const dataString = fs.readFileSync('my_examples/data.txt')
//console.log(dataString)
//process.exit()
//
//const readable = Readable.from(generate());
const readable = Readable.from([]);

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

let result = '';
readable.on('data', (chunk) => {
  result += chunk;
//  console.log('data:: ', chunk);
})

readable.on('end', () => {
  console.log('end');
//  console.log('end', result);
  fs.writeFileSync('/tmp/data.txt', result)
})
