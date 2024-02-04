# Technology and Development Approach

This secction give an overview of technolgies to be used to build the functionality and platform and to justify how/why they will be used. The techolgies and approach used are a work in progress, and will more than likely be updated as we progress through the development process, and as we learn from the implementation the services and functionality to date.

### Technolgies used to deliver the functional services and Wallet Platform

* nodejs as the primary development language

* electron to allow the creation of an electron app that can be targeted to mobile phone platform

* libp2p for the peer to peer networking and communications functionality

* ipfs as the intial means of sharing content between connected wallets

* ethers to intereracted with the evm complient blockchains

* solidity to create any smart contrcat functionality required to create the incentive and rewards structures and protocols, and network token.

* there will also be a requirement for other small nodejs modules to create the platform and these will be further defined by the overall developmebt team and/or the individual developer work on that functionality at the time.

### Development enviroment and approach

* github used for source code repository, version control, work flow actions, and continuous integration with bult in testing and pull request intergration into primary development and release code bases.

* hardhat for solidity development, testing, and deployment of solidity smart contrcat functionality.

* jest for unit tesing and confirmation of correctness of code contributed. 

* code reviews and amendment before pull requests to keep code base consistant, clean, readable.

* technical analysis of key functional flows by development team, so as to understand where risks may be, and how these best mitigated in the development process.

* Continuous Integration and Continuous Delivery/Deployment using github actions, which aims to streamline and accelerate the software development lifecycle. Using devops and agile development techniques to help control and simplyfy the code base and interactions between the development team.

