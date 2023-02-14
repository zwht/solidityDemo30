// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SayHello {
    string public str;
    address public owner;

    modifier onlyOwer() {
        require(isOwer(), "Only ower can do that!");
        _;
    }

    constructor(string memory _str) {
        str = _str;
        owner = msg.sender;
    }

    function sayHello() public view returns (string memory) {
        if (isOwer()) {
            return "Hello owner!";
        } else {
            return str;
        }
    }

    function resetStr(string memory _str) public onlyOwer {
        str = _str;
    }

    function isOwer() private view returns (bool) {
        return msg.sender == owner;
    }
}
