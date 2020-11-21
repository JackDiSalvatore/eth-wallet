const EtherWallet = artifacts.require('EtherWallet')

const owner = '0x0000000000000000000000000000000000000000'

module.exports = function(deployer) {
  deployer.deploy(EtherWallet, owner)
}

