import Web3 from "web3";
const web3 = new Web3();
export function stringToBytes32(text: string) {
  var hex = web3.utils.asciiToHex(text);
  return web3.utils.padRight(hex, 64);
}
