const Token = artifacts.require("myToken")

const truffleAssert = require('truffle-assertions');

require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('myToken', (accounts) => {

 const InitialSupply = '1000000000000000000000';
  let token, currentOwner, spender, user1, minter;

  before(async () => {
    token = await Token.new()

    currentOwner = accounts[0];
    spender = accounts[1];
    user1 = accounts[2];
    minter = accounts[3];
  })



  describe('Token deployment', async () => {
    it('contract has a name', async () => {
      const name = await token.name()
      assert.equal(name, 'MicToken')
    })

        it('contract has symbol', async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, 'MTK')
    })

              it('contract has decimal', async () => {
      const decimal = await token.decimals()
      assert.equal(decimal, 18)
    })
  })



  describe('other details', async () => {
    it('initialized with the correct supply', async () => {
     let supply = await token.totalSupply();

      expect(supply.toString()).to.equal(InitialSupply);



    })


 it('check the contract deployer is the new owner and has all the money', async () => {
  
let ownerBalance = await token.balanceOf(currentOwner);
     
     assert.equal(ownerBalance, InitialSupply)
    })



  })


    describe('adding spenders that can transfer money on behalf of the token owner', async () => {
    it('this is known as allowance', async () => {
let result = await token.approve(spender, 1000);
let allowance = await token.allowance(currentOwner, spender);

   assert.equal(allowance.toString(), 1000)

    })


  })

       describe('transfer', async () => {
    it('current owner transfers to the spender', async () => {
        let result = await token.transfer(spender, 200);

        let balance = await token.balanceOf(spender);

        assert.equal(balance, 200)

    })


  })

   


              describe('allowance increase', async () => {
    it('increase allowance', async () => {
        let result = await token.increaseAllowance(spender, 300);

     let allowance = await token.allowance(currentOwner, spender);

        assert.equal(allowance.toString(), 1300);

    })

         


      it('decrease allowance', async () => {
        let result = await token.decreaseAllowance(spender, 800);

     let allowance = await token.allowance(currentOwner, spender);

        assert.equal(allowance.toString(), 500);

    })


  })



              describe('minter', async () => {
    it('current owner is by default a minter and can mint more tokens out of thin air', async () => {
 let result = await token.mint(currentOwner, 1000);

let balance = await token.balanceOf(currentOwner);
     
      balance = await token.totalSupply();
      expect(balance.toString()).to.equal('1000000000000000001000');

    })


  })

                 describe('burn function', async () => {
    it('owner can burn token', async () => {

let result =  await token.burn(200);
let balance = await token.totalSupply();
expect(balance.toString()).to.equal('1000000000000000000800');

    })


  })


                 


})
