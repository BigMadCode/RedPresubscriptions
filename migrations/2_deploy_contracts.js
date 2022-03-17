var RedPresubs = artifacts.require('./RedPresubs.sol');
require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
	// local testing setup

	// let addr = await web3.eth.getAccounts();
	// let addr2 = '0x6D39E1B2c7733b9A6681Ec17A58921800BFCCc48';
	// let RedToken = '0x223153FE0ACcDC98f997d71a04ca50cf2874Ce94';
	// let rate = web3.utils.toWei('400000', 'wei');
	// await deployer.deploy(RedPresubs, rate, addr[0], RedToken, addr2);

	// Testnet and Prod Set up

	//let addr = await web3.eth.getAccounts();
	let wallet = await '0x279550601C7D5Ae77e0026524eA583c4Ed435cb3';
	let tokenWallet = '0x8c9c1807eFE411076D705060cBE13359193e43b8';
	let RedToken = process.env.RED_ADDRESS2;
	let rate = web3.utils.toWei('400000', 'wei');
	await deployer.deploy(RedPresubs, rate, wallet, RedToken, tokenWallet);
};
