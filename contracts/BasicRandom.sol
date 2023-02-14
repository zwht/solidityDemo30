// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BasicRandom {
    uint randNoce = 0;

    function getRandomNumber() public view returns (uint) {
        uint rand = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNoce))
        );
        return rand;
    }
}


