//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract Ballot {

  string public name = "Ballot Contract";

  address public owner;

  uint256 public ballotCount = 0;

  mapping(string => uint256) public ballots;
  mapping(uint256 => string[]) public candidates;
  mapping(uint256 => string) public question;

  mapping(uint256 => mapping(address => uint256)) public vote;

  mapping(uint256 => mapping(address => uint256)) public voted;

  mapping(uint256 => mapping(uint256 => uint256)) public counts;

  constructor() {
    // account that is deploying the contract.
    owner = msg.sender;
  }

  event Log(uint256 ballotId, string ballotName, string[] candidates);
  event LogCandidates(
    uint256 ballotId,
    string[] candidates
  );
  event LogVote(
    uint256 ballotId,
    address voter,
    uint256 vote
  );

  function createBallot(
    string memory _title,
    string[] memory _candidates
  ) public returns (uint256 ballotId) {

    ballotId = ballotCount;

    ballotCount++;

    ballots[_title] = ballotId;
    question[ballotId] = _title;
    candidates[ballotId] = _candidates;

    emit Log(
      ballotId,
      _title,
      _candidates
    );

    emit LogCandidates(
      ballotId,
      _candidates
    );

    return ballotId;
  }

  function castVote(
    uint256 _ballotId,
    uint256 _vote
  ) public {
    
    require(_ballotId < ballotCount, "ballotId not setup");
    require(_vote < candidates[_ballotId].length, "voteId invalid");
    require(voted[_ballotId][msg.sender] != 1, "msg.sender already voted");

    voted[_ballotId][msg.sender] = 1;
    counts[_ballotId][_vote]++;

    emit LogVote(
      _ballotId,
      msg.sender,
      _vote
    );
  }

  function getCandidate(
    uint256 _ballotId,
    uint256 _position
  ) public view returns (string memory _candidate) {
    return candidates[_ballotId][_position];
  }

  function getVote(
    uint256 _ballotId
  ) public view returns (uint256 _vote) {
    return vote[_ballotId][msg.sender];
  }
}
