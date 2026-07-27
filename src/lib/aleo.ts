export const ORACLE_PROGRAM_ID = 'dark_optimistic_oracle.aleo';
export const MARKET_PROGRAM_ID = 'doo_prediction_market.aleo';
export const TESTNET_API_URL =
  import.meta.env.VITE_ALEO_API_URL ?? 'https://api.explorer.provable.com/v2';
export const TRANSACTION_FEE = 1_000_000;

const FIELD_MODULUS =
  8444461749428370424248824938781546531375899335154063827935233455917409239041n;
const U32_MAX = 4_294_967_295n;
const U64_MAX = 18_446_744_073_709_551_615n;
const U128_MAX = 340_282_366_920_938_463_463_374_607_431_768_211_455n;

function normalizeUnsigned(
  value: string,
  suffix: 'field' | 'u32' | 'u64' | 'u128',
  maximum: bigint,
) {
  const trimmed = value.trim();
  const withoutSuffix = trimmed.endsWith(suffix)
    ? trimmed.slice(0, -suffix.length)
    : trimmed;
  if (!/^(0|[1-9][\d_]*)$/.test(withoutSuffix)) {
    throw new Error(`${suffix} values must be unsigned decimal integers.`);
  }
  const digits = withoutSuffix.replaceAll('_', '');
  const integer = BigInt(digits);
  if (integer > maximum) throw new Error(`${suffix} value is out of range.`);
  return `${digits}${suffix}`;
}

export const toField = (value: string) =>
  normalizeUnsigned(value, 'field', FIELD_MODULUS - 1n);

export const toU32 = (value: string) => normalizeUnsigned(value, 'u32', U32_MAX);
export const toU64 = (value: string) => normalizeUnsigned(value, 'u64', U64_MAX);
export const toU128 = (value: string) => normalizeUnsigned(value, 'u128', U128_MAX);

export function normalizeRecord(value: string, label: string) {
  const record = value.trim();
  if (!record) throw new Error(`${label} is required.`);
  if (record.length > 100_000) throw new Error(`${label} is too large.`);
  return record;
}

export async function textToField(value: string) {
  const encoded = new TextEncoder().encode(value.trim());
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  const integer = Array.from(new Uint8Array(digest)).reduce(
    (result, byte) => (result << 8n) + BigInt(byte),
    0n,
  );
  return `${integer % FIELD_MODULUS}field`;
}

export function asciiToU128(value: string) {
  const bytes = new TextEncoder().encode(value);
  if (bytes.length === 0) throw new Error('Token metadata cannot be empty.');
  if (bytes.length > 16) throw new Error('Token metadata is limited to 16 ASCII bytes.');
  if (Array.from(bytes).some((byte) => byte > 0x7f)) {
    throw new Error('Token metadata must use ASCII characters.');
  }
  const integer = Array.from(bytes).reduce(
    (result, byte) => (result << 8n) + BigInt(byte),
    0n,
  );
  return `${integer}u128`;
}

export async function readMapping(
  program: string,
  mapping: string,
  key: string,
) {
  const response = await fetch(
    `${TESTNET_API_URL}/testnet/program/${program}/mapping/${mapping}/${encodeURIComponent(key)}`,
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to read ${mapping} (${response.status}).`);
  const value: unknown = await response.json();
  return typeof value === 'string' ? value : JSON.stringify(value);
}

export function extractBlockHeight(source: string, key: string) {
  const expression = new RegExp(`${key}:\\s*([\\d_]+)u32`);
  const match = source.match(expression);
  return match ? Number(match[1].replaceAll('_', '')) : null;
}
