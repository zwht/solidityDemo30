// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BalanceAddressChecker {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Only ower can do that!");
        _;
    }

    function isOwner() private view returns (bool) {
        return msg.sender == owner;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getOwerAddress() public view returns(address){
      return owner;
    }
    function getSenderAddress() public view returns(address){
      return msg.sender;
    }
    function getContractBalance() public view returns(uint){
      return address(this).balance;
    }
    function getOwnerBalance() public onlyOwner view returns(uint){
      return owner.balance;
    }
    function getSenderBalance() public view returns(uint){
      return msg.sender.balance;
    }
}
