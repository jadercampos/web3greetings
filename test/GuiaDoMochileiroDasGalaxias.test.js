const GuiaDoMochileiroDasGalaxias = artifacts.require('./GuiaDoMochileiroDasGalaxias.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('GuiaDoMochileiroDasGalaxias', ([deployer, seller, buyer]) => {
  let guia

  before(async () => {
    guia = await GuiaDoMochileiroDasGalaxias.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await guia.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('dapp has a name', async () => {
      const appName = await guia.appName()
      assert.equal(appName, 'Dapp - O Guia Do Mochileiro Das Galaxias')
    })
  })

  describe('tips', async () => {
    let result, tipCount

    before(async () => {
      result = await guia.createTip('Ford Prefect', "DONT PANIC!", { from: seller })
      tipCount = await guia.tipCount()
    })

    it('creates tips', async () => {
      // SUCCESS
      assert.equal(tipCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), tipCount.toNumber(), 'id is correct')
      assert.equal(event.author, 'Ford Prefect', 'author is correct')
      assert.equal(event.description, 'DONT PANIC!', 'description is correct')
      assert.equal(event.owner, seller, 'owner is correct')

      // FAILURE: Tip must have an suthor
      await await guia.createTip('', 'DONT PANIC!', { from: seller }).should.be.rejected;
      // FAILURE: Tip must have a description
      await await guia.createTip('Ford Prefect', '', { from: seller }).should.be.rejected;
    })

    it('lists tips', async () => {
      const tip = await guia.tips(tipCount)
      assert.equal(tip.id.toNumber(), tipCount.toNumber(), 'id is correct')
      assert.equal(tip.author, 'Ford Prefect', 'author is correct')
      assert.equal(tip.description, 'DONT PANIC!', 'description is correct')
      assert.equal(tip.owner, seller, 'owner is correct')
    })

  })
})
