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
  mapping(uint256 => string[]) canditdates;
  mapping(uint256 => mapping(uint256 => uint256)) vote;

  constructor() {
    // account that is deploying the contract.
    owner = msg.sender;
  }

/*
  function vote(uint256 ballot, uint256 vote) public {
  }
*/

  event Log(uint256 ballotId, string ballotName, string[] candidates);
  event LogCandidates(
    uint256 ballotId,
    string[] candidates
  );

  function createBallot(
    string memory title,
    string[] memory candidates
  ) public returns (uint256 ballotId) {
    ballotId = ballotCount;
    ballots[title] = ballotId;
    canditdates[ballotId] = candidates;
    ballotCount++;
    emit Log(
      ballotId,
      title,
      candidates
    );
    emit LogCandidates(
      ballotId,
      candidates
    );
    return ballotId;
  }

//  function createCandidates(
//    uint256 ballotId,
//    string[] memory candidates
//  ) public {
//    candidates[ballotId] = candidates;
//  }

  /**
   * A function to transfer tokens.
   *
   * The `external` modifier makes a function *only* callable from *outside*
   * the contract.
   */
/*
  function transfer(address to, uint256 amount) external {
    // Check if the transaction sender has enough tokens.
    // If `require`'s first argument evaluates to `false` then the
    // transaction will revert.
    require(balances[msg.sender] >= amount, "Not enough tokens");

    // Transfer the amount.
    balances[msg.sender] -= amount;
    balances[to] += amount;

    // Notify off-chain applications of the transfer.
    emit Transfer(msg.sender, to, amount);
  }
*/

  /**
   * Read only function to retrieve the token balance of a given account.
   *
   * The `view` modifier indicates that it doesn't modify the contract's
   * state, which allows us to call it without executing a transaction.
   */
/*
  function balanceOf(address account) external view returns (uint256) {
    return balances[account];
  }
*/
}
