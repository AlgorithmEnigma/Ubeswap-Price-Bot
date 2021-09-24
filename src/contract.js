const { newKit } = require("@celo/contractkit");
const { BigNumber } = require("bignumber.js");

const WEI = new BigNumber(1_000_000_000_000_000_000);
const testWalletAddress = "0x7670A545CDe28FD3e628FfafE96d78071C5881f6";
const ubeswapAddress = "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC";
const ubeswapABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_initialOwner","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"DelegateChanged","inputs":[{"type":"address","name":"delegator","internalType":"address","indexed":true},{"type":"address","name":"fromDelegate","internalType":"address","indexed":true},{"type":"address","name":"toDelegate","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"DelegateVotesChanged","inputs":[{"type":"address","name":"delegate","internalType":"address","indexed":true},{"type":"uint256","name":"previousBalance","internalType":"uint256","indexed":false},{"type":"uint256","name":"newBalance","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DELEGATION_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"MAX_SUPPLY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"_account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint32","name":"fromBlock","internalType":"uint32"},{"type":"uint96","name":"votes","internalType":"uint96"}],"name":"checkpoints","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint32","name":"","internalType":"uint32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegate","inputs":[{"type":"address","name":"delegatee","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegateBySig","inputs":[{"type":"address","name":"delegatee","internalType":"address"},{"type":"uint256","name":"nonce","internalType":"uint256"},{"type":"uint256","name":"expiry","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"delegates","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"getCurrentVotes","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"getPriorVotes","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint32","name":"","internalType":"uint32"}],"name":"numCheckpoints","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"totalVotingPower","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"src","internalType":"address"},{"type":"address","name":"dst","internalType":"address"},{"type":"uint256","name":"rawAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint96","name":"","internalType":"uint96"}],"name":"votingPower","inputs":[{"type":"address","name":"account","internalType":"address"}]}];

const kit = newKit("https://alfajores-forno.celo-testnet.org");
let accounts = async () => await kit.web3.eth.getAccounts();
kit.defaultAccount = accounts[0];
async function getAccountBalance(address) {
  let totalBalance = await kit.getTotalBalance(address);
  console.log(totalBalance.CELO.dividedBy(WEI).toFixed(5));
}

getAccountBalance(testWalletAddress);
// console.log(totalBalance);

const ubeswapContract = new kit.web3.eth.Contract(ubeswapABI, ubeswapAddress);
console.log(ubeswapContract);
// async function getContractName() {

// console.log(name);
// }
// getContractName()