/**
 * Generate a UUID v7 (time-ordered UUID)
 * Based on RFC 9562
 */
export function generateUuidV7(): string {
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, "0");

  // Generate random bytes for the rest
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  // Convert to hex
  const randomHex = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Construct UUID v7:
  // time_high (32 bits) - time_mid (16 bits) - version (4 bits) + time_low (12 bits) - variant (2 bits) + rand (14 bits) - rand (48 bits)
  const uuid = [
    timestampHex.slice(0, 8), // time_high
    timestampHex.slice(8, 12), // time_mid
    "7" + randomHex.slice(0, 3), // version 7 + random
    ((parseInt(randomHex.slice(3, 5), 16) & 0x3f) | 0x80)
      .toString(16)
      .padStart(2, "0") + randomHex.slice(5, 7), // variant 10 + random
    randomHex.slice(7, 19), // random
  ].join("-");

  return uuid;
}

const BASE62_CHARS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// UUID is 128 bits, base62 encoded = ceil(128 * log(2) / log(62)) = 22 characters
const SHORT_ID_LENGTH = 22;

/**
 * Convert a UUID to a short ID (base62 encoding)
 * Always returns exactly 22 characters (padded with leading zeros)
 */
export function uuidToShortId(uuid: string): string {
  const hex = uuid.replace(/-/g, "");

  let num = BigInt("0x" + hex);
  let result = "";

  const zero = BigInt(0);
  const base = BigInt(62);

  while (num > zero) {
    result = BASE62_CHARS[Number(num % base)] + result;
    num = num / base;
  }

  // Pad with leading zeros to ensure fixed length
  return result.padStart(SHORT_ID_LENGTH, "0");
}

const SHORT_ID_REGEX = /^[0-9A-Za-z]{22}$/;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Check if a string is a valid short ID format (22 base62 characters)
 */
export function isShortId(str: string): boolean {
  return SHORT_ID_REGEX.test(str);
}

/**
 * Check if a string is a valid UUID format
 */
export function isUuid(str: string): boolean {
  return UUID_REGEX.test(str);
}

/**
 * Convert a short ID back to UUID (base62 decoding)
 * Returns null if the input is not a valid shortId (wrong length or invalid characters)
 */
export function shortIdToUuid(shortId: string): string | null {
  // ShortId must be exactly 22 characters
  if (shortId.length !== SHORT_ID_LENGTH) return null;

  try {
    let num = BigInt(0);
    const base = BigInt(62);

    for (const char of shortId) {
      const index = BASE62_CHARS.indexOf(char);
      if (index === -1) return null;
      num = num * base + BigInt(index);
    }

    const hex = num.toString(16).padStart(32, "0");
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32),
    ].join("-");
  } catch {
    return null;
  }
}
