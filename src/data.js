const {
  ChainId,
  Token,
  cUSD,
  Fetcher,
  Route,
  Pair,
  Trade,
  TokenAmount,
  TradeType,
} = require("@ubeswap/sdk");
const { CeloProvider } = require("@celo-tools/celo-ethers-wrapper");
const tokenJSON = require("../tokens.json");

//TODO: Create Function Definition
// async function getDecimals(
//     chainId: ChainId,
//     tokenAddress: string
//   ): Promise<number> {
//     // implementation details
//   }

const tokens = JSON.parse(JSON.stringify(tokenJSON));

function getTokenInfo(symbol) {
  let token;
  tokens.forEach((element) => {
    if (element.symbol == symbol) {
      token = new Token(
        ChainId.MAINNET,
        element.address,
        18,
        element.symbol,
        element.name
      );
    }
  });
  return token;
}

const UBE = getTokenInfo("UBE");

async function getPrice(token0 = UBE, token1 = cUSD) {
  const PROVIDER = new CeloProvider("https://forno.celo.org");
  await PROVIDER.ready;
  const pair = await Fetcher.fetchPairData(
    token0,
    token1,
    PROVIDER
  );
  const route = new Route([pair], token1);
  return `${token0.symbol} Price | ${route.midPrice.invert().toSignificant(6)}`;
}


// TODO: Create market cap function
// exports.getMarketCap = async function (token0 = UBE) {};

//TODO: Create TVL Function

// let price = getPrice(UBE, cUSD).then((val) => {
//   console.log(val);
// });

// console.log(`Execution price: ${trade.executionPrice.toSignificant(6)}`);
// console.log(trade.nextMidPrice.toSignificant(6));

module.exports = { getPrice, getTokenInfo } 