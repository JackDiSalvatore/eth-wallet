pragma solidity >=0.4.22 <0.8.0;

contract EtherWallet {
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }

    // "payable" keyword lets this function receive Ether
    function deposit() payable public {
    }

    // address "payable" keyword describes the "address" type
    // of having the the "transfer" method
    function send(address payable to, uint amount) public {
        // "msg.sender" is the address that is sending the transaction
        // on this smart contract
        if (msg.sender == owner) {
            to.transfer(amount);
            return;
        }
        revert('Sender is not the owner');
    }

    function balanceOf() view public returns (uint) {
        // "this" keyword referce to smart contract
        // "address(this)" transforms this smart contract
        // into an address type
        // ".balance" is a member variable defining the Ether balance
        return address(this).balance;
    }

}
