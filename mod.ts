import { Wallet } from "https://cdn.skypack.dev/@ethersproject/wallet@5.6.2";

console.log("Generating wallet\n");

const w = Wallet.createRandom();
console.log("Private key:", w.privateKey);

const strDecode = (str: string) => new TextEncoder().encode(str);
const strEncode = (buff: Uint8Array) => new TextDecoder().decode(buff);
const hexDecode = (str: string) => {
  if (!str.match(/^(0x)?[0-9a-fA-F]+$/)) throw new Error("Invalid hex string");
  else if (str.length % 2 !== 0) throw new Error("Odd length");
  if (str.startsWith("0x")) str = str.substring(2);
  const result = new Uint8Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    result[i / 2] = parseInt(str.substring(i, i + 2), 16);
  }
  return result;
};
const hexEncode = (buff: Uint8Array) =>
  [...buff].map((byte) => byte.toString(16).padStart(2, "0")).join("");

const strKey = w.privateKey.slice(2);
console.log(`Private key buffer: ${hexDecode(strKey)}`);
console.log(`Decoded private key: 0x${hexEncode(hexDecode(strKey))}`);

///

const str = "some text";
const decodedStr = strDecode(str);
const recoveredString = strEncode(decodedStr);

console.log(
  `\nOriginal text: ${str}\nText bytes: ${decodedStr}\nRecovered text: ${recoveredString}`,
);
