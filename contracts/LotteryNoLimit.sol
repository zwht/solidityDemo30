// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract LotteryNoLimit {
    uint randNoce = 0;
    address[] userList;
    uint public winK;
    address owner;

    modifier onlyOwer() {
        require(isOwer(), "Only ower can do that!");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function join() public payable {
        require(msg.value == 0.1 ether, "value error");
        userList.push(msg.sender);
    }

    function win() public onlyOwer {
        require(userList.length > 0, "no users in the lottery");
        winK = getRandomNumber(userList.length);
        address winner = userList[winK];
        payable(winner).transfer(address(this).balance);
        delete userList;
    }

    function getRandomNumber(uint _limit) private returns (uint) {
        uint rand = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNoce))
        ) % _limit;
        randNoce++;
        return rand;
    }

    function isOwer() private view returns (bool) {
        return msg.sender == owner;
    }
}
