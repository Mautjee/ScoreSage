//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

contract ScoreSage {
	struct PlayerRating {
		uint32 rating;
		address pAddress;
	}

	// State Variables
	mapping(uint32 => mapping(address => uint32)) public gameRatings;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event newPublishedRating(
		uint32 indexed gameId,
		address indexed player,
		uint32 rating,
		bool winner
	);

	// TODO: Check the contract call for valid input

	function updatePlayerRating(
		uint32 _gameId,
		address _winnerAddress,
		address _loserAddress,
		uint32 _winnerRating,
		uint32 _loserRating
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
		gameRatings[_gameId][_winnerAddress] = _winnerRating;
		gameRatings[_gameId][_loserAddress] = _loserRating;

		// emit: keyword used to trigger an event
		emit newPublishedRating(_gameId, _winnerAddress, _winnerRating, true);
		emit newPublishedRating(_gameId, _loserAddress, _loserRating, false);
	}
}
