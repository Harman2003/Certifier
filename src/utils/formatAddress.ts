export function formatAddress(
  ethAddress: string,
  firstChars: number = 6,
  lastChars: number = 4
): string {
  if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    return "";
  }
  const start = ethAddress.slice(0, firstChars);
  const end = ethAddress.slice(-lastChars);
  const middleDots = ".".repeat(3);
  return `${start}${middleDots}${end}`;
}
