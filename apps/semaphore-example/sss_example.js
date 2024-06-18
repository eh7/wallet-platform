var secrets = require("secrets.js-grempe")

require('dotenv').config()

var key = process.env.PRIVATE_KEY_DEV_EVM_HH

// generate a 512-bit key
//var key = secrets.random(512) // => key is a hex string
//console.log(key);
//
var sharesTest = secrets.share('7574b8D4C0C2566b671C530d710821EB6694bE0C', 10, 2)
console.log(sharesTest)
process.exit();
 
// split into 10 shares with a threshold of 5
var shares = secrets.share(key, 20, 2)
// => shares = ['801xxx...xxx','802xxx...xxx','803xxx...xxx','804xxx...xxx','805xxx...xxx']
//
 
// combine 4 shares
var comb = secrets.combine(shares.slice(0, 4))
console.log(comb === key) // => false
 
/*
// combine 5 shares
comb = secrets.combine(shares.slice(4, 9))
console.log(comb === key) // => true
 
// combine ALL shares
comb = secrets.combine(shares)
console.log(comb === key) // => true
 
// create another share with id 8
var newShare = secrets.newShare(11, shares) // => newShare = '808xxx...xxx'
//console.log(shares);
//console.log(newShare);
//console.log(shares.slice(1, 5).concat(newShare));
 
// reconstruct using 4 original shares and the new share:
comb = secrets.combine(shares.slice(1, 5).concat(newShare))
console.log(comb === key) // => true

comb = secrets.combine(shares.slice(3, 7).concat(newShare))
console.log(comb === key) // => true

comb = secrets.combine([
 shares[9],
 shares[1],
 shares[1],
 shares[3],
 shares[6],
])
console.log(comb === key) // => true
*/

console.log(shares)
console.log(secrets.combine([
 shares[9],
 shares[2],
]) === key)
//console.log(shares)
//console.log(shares[1])

const newShares = ["814e6022ee44ac2474651f318399e21040cab0db772366801c744a23bb2f689e7dc90108757dca5f209aa677312acace5e7","8108151d3d0fa5aa701e637eb34e1dfa25cf9ab884e070b56381e57b04709ac143f5c65880d2c4625380cc62c0fed18455e"]
console.log('newShares', newShares)
console.log(secrets.combine(newShares));
const testShares = ["814e6022ee44ac2474651f318399e21040cab0db772366801c744a23bb2f689e7dc90108757dca5f209aa677312acace5e7","8108151d3d0fa5aa701e637eb34e1dfa25cf9ab884e070b56381e57b04709ac143f5c65880d2c4625380cc62c0fed18455e"]
console.log(secrets.combine(testShares));
