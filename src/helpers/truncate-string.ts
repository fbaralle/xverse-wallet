export default function truncateStringMiddle(address: string) {
  if (!address) return '';

  return `${address.substr(0, 5)}..${address.substr(address.length - 5)}`;
}
export function truncateString(
  str: string,
  num: number,
  position: 'end' | 'middle' = 'end',
) {
  if (!str) return null;
  if (str.length > num) {
    if (position === 'end') {
      return `${str.slice(0, num)}..`;
    }

    if ((position = 'middle')) {
      return `${str.slice(0, num / 2)}..${str.slice(str.length - num / 2)}`;
    }
  }
  return str;
}
