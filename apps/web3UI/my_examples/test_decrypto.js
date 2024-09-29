const crypto = require('crypto');

// Generate a random 16-byte key for AES-128
const key = '2e6c7f292306cd6518aff5ff99dba46e';

// Initialization Vector (IV) - should be random for each decryption
const iv = Buffer.alloc(16).fill(0);

// Message to decrypt
const message = '187145680cd07efad27ea86dbdbf7a0e7434dd5e753af1c427a147d621d7bb9980ac4ef633ec2504b8318e000757ed42';

// Create cipher object
const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key, 'hex'), iv);

// decryptthe message
let decryptedMessage = decipher.update(message, 'hex', 'utf-8');
decryptedMessage += decipher.final('hex');

console.log('Decrypted Message:', decryptedMessage);
console.log('Key:', key);
