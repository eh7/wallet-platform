const files = []

files.push({
name: 'test00.txt',
date :"data:text/plain;base64,MDAgdGVzdCBmaWxlCg=="
})

files.push({
  name: "test01.txt",
  data: "data:text/plain;base64,MDEgdGVzdCBmaWxlCg=="
})

files.push({
name: "test02.txt",
data: "data:text/plain;base64,MDIgdGVzdCBmaWxlCg=="
})

files.push({
name: "test99.txt",
data: "data:text/plain;base64,OTkgdGVzdCBmaWxlCg=="
})

files.push({
name: "test98.txt",
data: "data:text/plain;base64,OTggdGVzdCBmaWxlCg=="
})

files.push({
  name: "test00.json",
  data: "data:application/json;base64,ewoJIm5hbWUiOiAidGVzdGluZ05hbWUiLAoJImRhdGEiOiAidGhpcyBpcyBzb21lIGRhdGEiCn0K"
})

const client0 = []
client0.push(files[0])
client0.push(files[1])
client0.push(files[2])
client0.push(files[3])

const client1 = []
client1.push(files[3])
client1.push(files[4])
client1.push(files[5])

console.log({
  client0
})
console.log({
  client1}
)

function pushFile(array, file) {
  array.indexOf(file) === -1 ? array.push(file) : console.log("This file already exists");
}

const clientCombined = []
client0.map((file) => {
  pushFile(clientCombined, file)
})
client1.map((file) => {
  pushFile(clientCombined, file)
})
console.log({
  clientCombined
})


console.log(clientCombined[5])

var decoded = Buffer.from(
  //'OTggdGVzdCBmaWxlCg==',
  'ewoJIm5hbWUiOiAidGVzdGluZ05hbWUiLAoJImRhdGEiOiAidGhpcyBpcyBzb21lIGRhdGEiCn0K',
  'base64',
)
console.log(decoded.toString('utf8'))


/*
console.log('files', files)

// Define the string
//var decodedStringBtoA = 'Hello World!';
var decodedStringBtoA = '98 test file\n';

// Encode the String
var encodedStringBtoA = btoa(decodedStringBtoA);

console.log(encodedStringBtoA);
*/
