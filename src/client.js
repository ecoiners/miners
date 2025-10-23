// thirdwebClient.ts
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.THIRDWEB_CLIENT_ID
});


export const TokenAddress = process.env.TOKEN_ADDRESS || "0x4c3d7D3c4FE5c76E1d54f4dDd76EcCfdD1CA01df";
export const TokenSaleAddress = process.env.TOKEN_SALE_ADDRESS || "0x48FEEC9694D1cFFd052662a417A14af2d9979d71";




