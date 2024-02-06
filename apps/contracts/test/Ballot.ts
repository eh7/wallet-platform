import { expect } from "chai";
import { ethers } from "hardhat";


describe("Ballot contract", function () {
  it("Deployment should be owned by the send that created the contract", async function () {
    const [owner] = await ethers.getSigners();

    const ballotContract = await ethers.deployContract("Ballot");

    expect(await ballotContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("add a ballot", async function () {
    const testBallotName = 'test ballot name';
    const testCandidates = [
      'yes',
      'no',
    ];
    const ballotContract = await ethers.deployContract("Ballot");

//    ballotContract.on("Log", (setter, LogArgs, event)=> {
//      console.log("New Log Event is:", LogArgs, event);
//    });

//    const event = interface.decodeEventLog("Transfer", data, topics);


    expect(Number(await ballotContract.ballotCount())).to.equal(0);
    const ballotAddedObject = await ballotContract.createBallot(
      testBallotName,
      testCandidates,
    );
    expect(Number(await ballotContract.ballotCount())).to.equal(1);
    const ballotCount = await ballotContract.ballotCount();
    const ballot = await ballotContract.ballots(testBallotName);
    console.log(
      Number(ballot), 
      Number(ballotCount)
    );

    expect(ballotAddedObject)
      .to.emit(ballotContract, 'Log')
      .withArgs(
        Number(ballot),
        testBallotName,
        testCandidates
      );

    expect(ballotAddedObject)
      .to.emit(ballotContract, 'LogCandidates')
      .withArgs(
        Number(ballot),
        testCandidates
      );

    const ballotAddedObjectResult = await ballotAddedObject.wait();
    const eventBallotId = Number(ballotAddedObjectResult.logs[0].args[0]);
    const eventBallotName = ballotAddedObjectResult.logs[0].args[1];
    const eventBallotCandidates = ballotAddedObjectResult.logs[0].args[2];
    console.log('Log event args');
    console.log('eventBallotId :: ', eventBallotId);
    console.log('eventBallotName :: ', eventBallotName);
    console.log('eventBallotCandidates :: ', eventBallotCandidates);

    const eventBallotIdLogCandidates = Number(ballotAddedObjectResult.logs[1].args[0]);
    const eventCandidatesLogCandidates = ballotAddedObjectResult.logs[1].args[1];
    console.log('\nLogCandidates event args');
    console.log('eventBallotIdLogCandidates :: ', eventBallotIdLogCandidates);
    console.log('eventCandidatesLogCandiates :: ', eventCandidatesLogCandidates);
    

    //console.log(ballotAddedObject);
  });
});
