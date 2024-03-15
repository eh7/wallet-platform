# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
## Create a .env file
cp .env.example .env
then
and enter your details in .env file

INFO
----

Ballot deplyed address seplia: 0xE20ba754f2abbA1D8aa6da49af37FD9f6f69410d

to verify;
npx hardhat verify 0xE20ba754f2abbA1D8aa6da49af37FD9f6f69410d --network sepolia
