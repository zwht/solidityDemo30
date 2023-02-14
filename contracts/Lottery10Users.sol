// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lottery10Users {
    uint randNoce = 0;
    uint count = 0;
    address[10] userObj;
    uint public winK;

    function join() public payable {
        require(msg.value == 0.1 ether, "value error");
        require(count < 10, "count error");
        require(joined(msg.sender) == false, "is joined");

        userObj[count] = msg.sender;
        count++;
        if (count == 10) {
            winK = win();
        }
    }

    function win() private returns (uint) {
        require(count == 10, "count error");
        uint nb = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNoce))
        ) % 10;

        address winner = userObj[nb];
        payable(winner).transfer(address(this).balance);
        randNoce++;
        count = 0;
        delete userObj;
        return nb;
    }

    function joined(address _user) private view returns (bool) {
        bool k = false;
        for (uint i = 0; i < userObj.length; i++) {
            if (userObj[i] == _user) {
                k = true;
            }
        }
        return k;
    }

    function getK() public view returns (uint) {
        return count;
    }
}
