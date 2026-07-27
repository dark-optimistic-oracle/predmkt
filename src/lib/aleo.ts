export const ORACLE_PROGRAM_ID = 'dark_optimistic_oracle.aleo';
export const MARKET_PROGRAM_ID = 'doo_prediction_market.aleo';
export const TESTNET_API_URL =
  import.meta.env.VITE_ALEO_API_URL ?? 'https://api.explorer.provable.com/v1';
export const TRANSACTION_FEE = 1_000_000;

const FIELD_MODULUS =
  8444461749428370424248824938781546531375899335154063827935233455917409239041n;

export const toField = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('field') ? trimmed : `${trimmed || '0'}field`;
};

export const toU128 = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('u128') ? trimmed : `${trimmed || '0'}u128`;
};

export const toU32 = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('u32') ? trimmed : `${trimmed || '0'}u32`;
};

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
  if (bytes.length > 16) throw new Error('Token metadata is limited to 16 ASCII bytes.');
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
