const EtherWallet = artifacts.require('EtherWallet')

contract('EtherWallet', async () => {
  let etherWallet = null

  before(async () => {
    etherWallet = await etherWallet.deployed()
  })

})
