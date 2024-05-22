import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

//considering a liquidity pool with 20 ETH and 20000 USDC
let ETH_BALANCE = 20;
let USDC_BALANCE = 20000;

// trying to buy eth with usdc
app.post("/buy-eth", (req, res) => {
  const quanity = req.body.quantity;
  console.log(quanity);
  const k = ETH_BALANCE * USDC_BALANCE;
  const new_eth_balance = ETH_BALANCE - quanity;
  const new_usdc_balance = k / new_eth_balance;
  ETH_BALANCE = new_eth_balance;
  USDC_BALANCE = new_usdc_balance;
  const bought_at = USDC_BALANCE / quanity;
  res.send({
    message: "ETH bought successfully",
    "quantity bought": quanity,
    "ETH Balance": ETH_BALANCE,
    "bought at": bought_at,
    "USDC Balance": USDC_BALANCE,
  });
});

app.post("/sell-eth", (req, res) => {
  const quanity = req.body.quantity;
  const k = ETH_BALANCE * USDC_BALANCE;
  const new_eth_balance = ETH_BALANCE + quanity;
  const new_usdc_balance = k / new_eth_balance;
  ETH_BALANCE = new_eth_balance;
  USDC_BALANCE = new_usdc_balance;
  const usdc_received = USDC_BALANCE - new_usdc_balance;
  res.send({
    message: "ETH sold successfully",
    "quantity sold": quanity,
    "ETH Balance": ETH_BALANCE,
    "udsc received": usdc_received,
    "USDC Balance": USDC_BALANCE,
  });
});

app.listen(3000);
