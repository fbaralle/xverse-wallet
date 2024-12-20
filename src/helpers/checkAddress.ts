import { validate, getAddressInfo, Network } from "bitcoin-address-validation";

/**
 * Validates a Bitcoin address.
 *
 * @param address - The Bitcoin address to validate.
 * @returns True if the address is valid, false otherwise.
 */
export const isValidBitcoinAddress = (address: string): boolean => {
  if (typeof address !== "string" || address.length < 10) {
    return false;
  }
  try {
    // Try to decode the address as Bech32 or Bech32m
    validate(address, Network.mainnet);
    return true;
  } catch (e) {
    // Not a Base58 address either
  }

  return false;
};
