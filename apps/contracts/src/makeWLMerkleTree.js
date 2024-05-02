const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")

// List of 7 public Ethereum addresses
let addresses = [
    "0x92dAf44EE49DCdAA21e9dcb90ceb6bd50f20AC1A",
    "0x0000000000000000000000000000000000000010",
    "0x0000000000000000000000000000000000000011",
    "0x0000000000000000000000000000000000000012",
    "0x0000000000000000000000000000000000000013",
    "0x0000000000000000000000000000000000000014",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
]

// Hash addresses to get the leaves
let leaves = addresses.map(addr => keccak256(addr))

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true})
// Get root
let rootHash = merkleTree.getRoot().toString('hex')

// Pretty-print tree
//console.log(merkleTree)
//console.log(merkleTree.toString())
console.log(rootHash)

// 'Serverside' code
//let address = addresses[0]
//let address = "0x92dAf44EE49DCdAA21e9dcb90ceb6bd50f20AC1A";
let address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
let hashedAddress = keccak256(address)
let proof = merkleTree.getHexProof(hashedAddress)
console.log('proof', proof)

// Check proof
let v = merkleTree.verify(proof, hashedAddress, rootHash)
console.log(v) // returns true
