import Web3 from "web3";
const web3 = new Web3(window.ethereum);
export function stringToBytes32(text: string) {
  if (!text) {
    return web3.utils.padRight('0x0', 64);
  }
    var hex = web3.utils.asciiToHex(text);
    return web3.utils.padRight(hex, 64);
}
