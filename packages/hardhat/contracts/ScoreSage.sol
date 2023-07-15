//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract ScoreSage {
	struct PlayerRating {
		uint256 rating;
		address pAddress;
	}

	// State Variables
	mapping(address => uint256) public playerRating;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event newPublishedRating(address playerSender, uint256 rating, bool winner);

	// TODO: Check the contract call for valid input

	function updatePlayerRating(
		address _winnerAddress,
		address _loserAddress,
		uint256 _winnerRating,
		uint256 _loserRating
	) public {
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log(
			"Changing the winner raring: '%s' of %s ",
			_winnerRating,
			_winnerAddress
		);
		console.log(
			"Changing the loser raring: '%s' of %s // loser rating '%s' of %s",
			_loserRating,
			_loserAddress
		);

		// Change state variables
		playerRating[_winnerAddress] = _winnerRating;
		playerRating[_loserAddress] = _loserRating;

		// emit: keyword used to trigger an event
		emit newPublishedRating(_winnerAddress, _winnerRating, true);
		emit newPublishedRating(_loserAddress, _loserRating, true);
	}
}
