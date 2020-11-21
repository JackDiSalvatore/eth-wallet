const EtherWallet = artifacts.require('EtherWallet')

// "accounts" array imported by truffle ganache
contract('EtherWallet', async (accounts) => {
  let etherWallet = null
  const owner = accounts[0]
  const recipient = accounts[1]

  before(async () => {
    etherWallet = await EtherWallet.deployed()
  })

  it('Should be deployed to the owner', async () => {
   const walletOwner = await etherWallet.owner()
   assert(owner === walletOwner)
  })

  it('Should receive deposited Ether', async () => {
    await etherWallet.deposit({
      from: owner,
      value: 100
    })

    // "web3.eth.getBalance" is a web3 function injected by truffle
    // used to get the Ether balance of an address
    const walletBalance = await web3.eth.getBalance(etherWallet.address)
    assert(parseInt(walletBalance) === 100)
  })

  it('Should increase the wallet balance after Ether is deposited', async () => {
    const walletBalance = await etherWallet.balanceOf()
    assert(parseInt(walletBalance) === 100)
  })

  it('Should send Ether when owner calls send', async () => {
    // use "web2.utils.toBN" to manipulate Ether balances
    const recipientBalanceBefore = await web3.eth.getBalance(recipient)
    const recipientInitialBalance = web3.utils.toBN(recipientBalanceBefore);

    await etherWallet.send(recipient, 50, {from: owner})

    // walletBalance should decrease
    const walletBalance = await etherWallet.balanceOf()
    assert(parseInt(walletBalance) === 50)

    // recipient balance should increase
    const recipientBalanceAfter = await web3.eth.getBalance(recipient)
    const recipientFinalBalance = web3.utils.toBN(recipientBalanceAfter)
    assert(recipientFinalBalance.sub(recipientInitialBalance).toNumber() === 50)
  })

  it('Should not send Ether when called by non owner account', async () => {
    try {
        await etherWallet.send(accounts[2], 25, {from: recipient})
    } catch (e) {
        assert(e.message.includes('Sender is not the owner'))
        return
    }
    assert(false)
  })

})
