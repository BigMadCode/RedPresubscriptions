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
	let addr = await '0x49861E23041382F03334CACAfB372f13959E49Bc';
	let addr2 = '0xc96dAEC94C38CbDA6Dc1eb59E0d6Ff0D2f7A1631';
	let RedToken = process.env.RED_ADDRESS2;
	let rate = web3.utils.toWei('400000', 'wei');
	await deployer.deploy(RedPresubs, rate, addr, RedToken, addr2);
};
