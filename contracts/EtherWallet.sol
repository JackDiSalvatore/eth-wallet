pragma solidity >=0.4.22 <0.8.0;

contract EtherWallet {
    // "payable" keyword lets this function receive Ether
    function deposit() payable public {
    }

    // address "payable" keyword describes the "address" type
    // of having the the "transfer" method
    function send(address payable to, uint amount) public {
        to.transfer(amount);
    }
}
