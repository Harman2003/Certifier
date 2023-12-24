export function formatAddress(
  ethAddress: string | undefined,
  firstChars: number = 6,
  lastChars: number = 4
): string {
  if (!ethAddress) return "";
  const start = ethAddress.slice(0, firstChars);
  const end = ethAddress.slice(-lastChars);
  const middleDots = ".".repeat(3);
  return `${start}${middleDots}${end}`;
}
