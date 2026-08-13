import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  asciiToU128,
  extractBlockHeight,
  normalizeRecord,
  readMapping,
  textToField,
  toField,
  toU32,
  toU64,
  toU128,
} from './aleo';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Aleo input formatting', () => {
  it('normalizes valid unsigned values and separators', () => {
    expect(toField('1_001field')).toBe('1001field');
    expect(toU32('42')).toBe('42u32');
    expect(toU64('9u64')).toBe('9u64');
    expect(toU128('10_000')).toBe('10000u128');
  });

  it('rejects empty, signed, fractional, malformed, and out-of-range values', () => {
    expect(() => toField('')).toThrow(/unsigned decimal/i);
    expect(() => toU32('-1')).toThrow(/unsigned decimal/i);
    expect(() => toU64('1.5')).toThrow(/unsigned decimal/i);
    expect(() => toU128('10u64')).toThrow(/unsigned decimal/i);
    expect(() => toU32('4294967296')).toThrow(/out of range/i);
  });

  it('encodes non-empty ASCII metadata within the u128 limit', () => {
    expect(asciiToU128('YES101')).toMatch(/u128$/);
    expect(() => asciiToU128('')).toThrow(/empty/i);
    expect(() => asciiToU128('YES✓')).toThrow(/ASCII/i);
    expect(() => asciiToU128('12345678901234567')).toThrow(/16 ASCII bytes/i);
  });

  it('bounds private record input without persisting or parsing it', () => {
    expect(normalizeRecord('  { owner: aleo1example }  ', 'Voting right')).toBe(
      '{ owner: aleo1example }',
    );
    expect(() => normalizeRecord(' ', 'Voting right')).toThrow(/required/i);
    expect(() => normalizeRecord('x'.repeat(100_001), 'Voting right')).toThrow(/too large/i);
  });
});

describe('Aleo hashing and API parsing', () => {
  it('hashes text deterministically into the field range', async () => {
    const first = await textToField('canonical claim');
    const second = await textToField('canonical claim');
    expect(first).toBe(second);
    expect(BigInt(first.replace('field', ''))).toBeLessThan(
      8444461749428370424248824938781546531375899335154063827935233455917409239041n,
    );
  });

  it('extracts block heights from Aleo struct text', () => {
    expect(
      extractBlockHeight('{ betting_deadline_block_height: 1_234u32 }', 'betting_deadline_block_height'),
    ).toBe(1234);
    expect(extractBlockHeight('{ id: 1field }', 'betting_deadline_block_height')).toBeNull();
  });

  it('returns mapping values, falls back between official APIs, and rejects errors', async () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    const fetchMock = vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      if (url.endsWith('/1field')) {
        return { ok: true, status: 200, json: async () => '42u128' };
      }
      if (url.endsWith('/2field')) return { ok: false, status: 404 };
      if (url.endsWith('/3field')) return { ok: false, status: 503 };
      if (url.endsWith('/4field') && url.startsWith('https://api.provable.com/')) {
        return { ok: false, status: 404 };
      }
      return { ok: true, status: 200, json: async () => '7u128' };
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(readMapping('program.aleo', 'values', '1field')).resolves.toBe('42u128');
    await expect(readMapping('program.aleo', 'values', '2field')).resolves.toBeNull();
    await expect(readMapping('program.aleo', 'values', '3field')).rejects.toThrow(
      /Unable to read values \(503\)/,
    );
    await expect(readMapping('program.aleo', 'values', '4field')).resolves.toBe('7u128');

    const requests = consoleSpy.mock.calls
      .filter(([prefix]) => prefix === '[Aleo audit]')
      .map(([, entry]) => JSON.parse(String(entry)))
      .filter((entry) => entry.phase === 'request' && entry.kind === 'read');
    expect(requests[0]).toEqual(expect.objectContaining({
      description: 'Read program.aleo.values[1field]',
      program: 'program.aleo',
      function: 'get_mapping_value',
      parameters: expect.objectContaining({
        mapping: 'values',
        key: '1field',
        httpMethod: 'GET',
        url: expect.stringContaining('/mapping/values/1field'),
      }),
    }));
    expect(requests.map((entry) => entry.sequence)).toEqual(
      [...requests.map((entry) => entry.sequence)].sort((a, b) => a - b),
    );
    consoleSpy.mockRestore();
  });
});
