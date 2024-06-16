var secrets = require("secrets.js-grempe")

require('dotenv').config()

var key = process.env.PRIVATE_KEY_DEV_EVM_HH

// generate a 512-bit key
//var key = secrets.random(512) // => key is a hex string
//console.log(key);
 
// split into 10 shares with a threshold of 5
var shares = secrets.share(key, 10, 5)
// => shares = ['801xxx...xxx','802xxx...xxx','803xxx...xxx','804xxx...xxx','805xxx...xxx']
//
 
// combine 4 shares
var comb = secrets.combine(shares.slice(0, 4))
console.log(comb === key) // => false
 
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

