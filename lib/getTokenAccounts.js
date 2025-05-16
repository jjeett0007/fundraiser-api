const config = require("../config/index");

const mintAddress = config.block.usdcMint;

const getATokenAccounts = async (walletAddress) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "1",
      method: "getTokenAccountsByOwner",
      params: [
        walletAddress,
        { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
        { encoding: "jsonParsed" },
      ],
    }),
  };

  try {
    const response = await fetch(
      `https://devnet.helius-rpc.com/?api-key=0b2449ac-ce81-445c-b77f-3286179464f5`,
      options
    );
    const data = await response.json();
    const found = data.result.value.find(
      (item) => item.account.data.parsed.info.mint === mintAddress
    );
    return {
      data: found || 404,
    };
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getATokenAccounts };
