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

//TODO: Create Function Definition
// async function getDecimals(
//     chainId: ChainId,
//     tokenAddress: string
//   ): Promise<number> {
//     // implementation details
//   }


const UBE = new Token(
  ChainId.MAINNET,
  "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC", // must be checksummed, decimals
  18,
  "UBE",
  "Ubeswap Goverance Token"
);

const CELO = new Token(
    ChainId.MAINNET,
    "0x471EcE3750Da237f93B8E339c536989b8978a438",
    18,
    "CELO",
    "CELO Token"
);

// const pair = await Fetcher.fetchPairData(UBE, cUSD[UBE.chainId], PROVIDER);

// console.log(pair);
// const route = new Route([pair], cUSD[UBE.chainId]);

// console.log(`MidPrice | ${route.midPrice.toSignificant(6)}`);
// console.log(route.midPrice.invert().toSignificant(6)); // 0

// const trade = new Trade(
//   route,
//   new TokenAmount(cUSD[UBE.chainId], "1000000000000000000"),
//   TradeType.EXACT_INPUT
// );

exports.getPrice = async function (token0 = UBE,token1 = cUSD) {
    const PROVIDER = new CeloProvider("https://forno.celo.org");
    await PROVIDER.ready;
    const pair = await Fetcher.fetchPairData(token0, token1[token0.chainId], PROVIDER);
    const route = new Route([pair], token1[token0.chainId]);
    return `${token0.symbol} Price | ${route.midPrice.invert().toSignificant(6)}`;
}

// let price = getPrice(UBE, cUSD).then( (val) => {
//     console.log(val)}
// );

// console.log(`Execution price: ${trade.executionPrice.toSignificant(6)}`);
// console.log(trade.nextMidPrice.toSignificant(6));
