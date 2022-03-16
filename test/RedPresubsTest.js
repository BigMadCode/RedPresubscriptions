const RedPresubs = artifacts.require('RedPresubs');
const Red = artifacts.require('RED');

const chai = require('./setupchai.js');
const BN = web3.utils.BN;
const expect = chai.expect;

require('dotenv').config({ path: '../.env' });

contract('RedPresubs Test', function (accounts) {
	const [deployerAccount, recipient, tokenWallet] = accounts;

	it('#1 Crowdsale Should have allowance of 1 million RED tokens', async () => {
		let instance = await RedPresubs.deployed();
		let redInstance = await Red.deployed();
		let amount = process.env.AMOUNT;

		await redInstance.transfer(tokenWallet, amount);
		await redInstance.approve(instance.address, amount, { from: tokenWallet });
		let balance = await instance.remainingTokens();

		let allowance = await redInstance.allowance(tokenWallet, instance.address);
		return expect(allowance).to.be.a.bignumber.equal(new BN(balance));
	});

	it('#2 should be possible to buy one token by simply sending ether to the smart contract', async () => {
		let instance = await RedPresubs.deployed();
		let redInstance = await Red.deployed();
		let purchaseAmount = web3.utils.toWei('1', 'ether');

		await expect(instance.sendTransaction({ from: recipient, value: purchaseAmount })).to.be.fulfilled;
		//await expect(instance.buyTokens({ beneficiary: recipient, value: purchaseAmount })).to.be.fulfilled;

		let postPurchaseAllowance = await instance.remainingTokens();
		return expect(instance.weiRaised()).to.eventually.be.a.bignumber.equal(new BN(purchaseAmount));
	});

	it('#3 Should not be able to buy more than contract allowance', async () => {
		let instance = await RedPresubs.deployed();
		let redInstance = await Red.deployed();
		let amount = process.env.EXCESS_AMOUNT;
		let balance = await instance.remainingTokens();
		await expect(instance.sendTransaction({ from: recipient, value: amount })).to.be.rejected;
		let allowedBalance = await redInstance.allowance(tokenWallet, instance.address);

		return expect(balance).to.be.a.bignumber.equal(new BN(allowedBalance));
	});

	// it('#4 should not be possible to buy tokens by sending an amount above 13 ether to the smart contract', async () => {
	// 	let instance = await RedPresubs.deployed();
	// 	let redInstance = await Red.deployed();
	// 	let purchaseAmount = web3.utils.toWei('14', 'ether');

	// 	await expect(instance.sendTransaction({ from: recipient, value: purchaseAmount })).to.be.rejected;
	// 	//await expect(instance.buyTokens({ beneficiary: recipient, value: purchaseAmount })).to.be.fulfilled;
	// 	let postPurchaseAllowance = await instance.remainingTokens();
	// 	return console.log('The Post purchase Allowance A is ' + postPurchaseAllowance.toString());
	// });

	it('#5 Eth Raised should be transfered to wallet.', async () => {
		let instance = await RedPresubs.deployed();
		let redInstance = await Red.deployed();
		const previousBalance = await web3.eth.getBalance(deployerAccount);
		let purchaseAmount = web3.utils.toWei('1', 'ether');

		await expect(instance.sendTransaction({ from: recipient, value: purchaseAmount })).to.be.fulfilled;
		const postBalance = await web3.eth.getBalance(deployerAccount);
		expect(postBalance).to.be.a.bignumber.greaterThan(new BN(previousBalance));
		return await expect(instance.weiRaised()).to.eventually.be.a.bignumber.equal(new BN(web3.utils.toWei('2')));
	});
});
