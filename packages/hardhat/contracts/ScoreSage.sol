//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "./verifiers/ValidEloCalculation.sol";

contract ScoreSage {
	struct PlayerRating {
		uint32 rating;
		address pAddress;
	}

	UltraVerifier public verifier;

	// State Variables
	mapping(string => mapping(address => uint32)) public gameRatings;

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event newPublishedRating(
		string gameId,
		address indexed player,
		uint32 rating,
		bool winner,
		bytes proof,
		bytes32[] witness
	);

	constructor(UltraVerifier _verifier) {
		verifier = _verifier;
	}

	function updatePlayerRating(
		string calldata _gameId,
		address _winnerAddress,
		address _loserAddress,
		uint32 _winnerRating,
		uint32 _loserRating,
		bytes calldata _proof
	) public {
		bytes32[] memory publicInputs = new bytes32[](4);
		if (gameRatings[_gameId][_winnerAddress] == 0) {
			gameRatings[_gameId][_winnerAddress] = 1500;
		}
		if (gameRatings[_gameId][_loserAddress] == 0) {
			gameRatings[_gameId][_loserAddress] = 1500;
		}

		publicInputs[0] = bytes32(
			uint256(gameRatings[_gameId][_winnerAddress])
		);
		publicInputs[1] = bytes32(uint256(_winnerRating));
		publicInputs[2] = bytes32(uint256(gameRatings[_gameId][_loserAddress]));
		publicInputs[3] = bytes32(uint256(_loserRating));

		assert(verifier.verify(_proof, publicInputs));
		// Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log("Game ID: '%s'", _gameId);
		console.log("WINNER: '%s' > %s ", _winnerRating, _winnerAddress);
		console.log("LOSER: '%s' > %s", _loserRating, _loserAddress);

		// Change state variables
		gameRatings[_gameId][_winnerAddress] = _winnerRating;
		gameRatings[_gameId][_loserAddress] = _loserRating;

		// emit: keyword used to trigger an event
		emit newPublishedRating(
			_gameId,
			_winnerAddress,
			_winnerRating,
			true,
			_proof,
			publicInputs
		);
		emit newPublishedRating(
			_gameId,
			_loserAddress,
			_loserRating,
			false,
			_proof,
			publicInputs
		);
	}
}
