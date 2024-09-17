import {Readable} from 'stream';

async function readableToString2(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const readable = Readable.from('Good morning!', {encoding: 'utf8'});
console.log(await readableToString2(readable))
//assert.equal(await readableToString2(readable), 'Good morning!');
