#!/usr/bin/env bash

# use `node --max-old-space-size=8192 node_modules/.bin/snarkjs` if the process dies because of out of memory

mkdir -p build/pot20

#wget -nc https://hermez.s3-eu-west-1.amazonaws.com/pot20_final.ptau -P ./build

[ ! -f ./build/pot20/verify-transfer-req-test.r1cs ] && circom test/circuits/verify-transfer-req-test.circom --wasm --r1cs -o ./build/pot20
[ ! -f ./build/po20/verify-transfer-req-test.zkey ] && npx snarkjs groth16 setup build/pot20/verify-transfer-req-test.r1cs build/pot20/pot20_final.ptau build/pot20/verify-transfer-req-test.zkey
[ ! -f ./build/po20/verify-transfer-req-test_vkey.json ] && npx snarkjs zkey export verificationkey build/pot20/verify-transfer-req-test.zkey build/pot20/verify-transfer-req-test_vkey.json
[ ! -f ./build/pot20/rollup-tx-test.r1cs ] && circom test/circuits/rollup-tx-test.circom --wasm --r1cs -o ./build/pot20
[ ! -f ./build/pot20/rollup-tx-test.zkey ] && npx snarkjs groth16 setup build/pot20/rollup-tx-test.r1cs build/pot20/pot20_final.ptau build/pot20/rollup-tx-test.zkey
[ ! -f ./build/pot20/rollup-tx-test_vkey.json ] && npx snarkjs zkey export verificationkey build/pot20/rollup-tx-test.zkey build/pot20/rollup-tx-test_vkey.json
[ ! -f ./build/pot20/rollup.r1cs ] && circom circuits/rollup.circom --wasm --r1cs -o ./build/pot20
[ ! -f ./build/pot20/rollup.zkey ] && npx snarkjs groth16 setup build/pot20/rollup.r1cs build/pot20/pot20_final.ptau build/pot20/rollup.zkey
[ ! -f ./build/pot20/rollup_vkey.json ] && npx snarkjs zkey export verificationkey build/pot20/rollup.zkey build/pot20/rollup_vkey.json
[ ! -f ./contracts/RollupVerifier.sol ] && npx snarkjs zkey export solidityverifier build/pot20/rollup.zkey contracts/RollupVerifierPot20.sol
sed -i -e 's/contract Groth16Verifier/contract RollupVerifierpPot20/g' contracts/RollupVerifierPot20.sol
exit 0
