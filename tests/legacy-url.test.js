import { describe, expect, it } from 'vitest';

import {
  buildLegacyGameUrl,
  normalizeBasePath,
  sanitizeLegacyPath,
} from '../src/app/legacy-url.js';

describe('legacy-url helpers', () => {
  it('normalizes base paths safely', () => {
    expect(normalizeBasePath('/')).toBe('/');
    expect(normalizeBasePath('/foo')).toBe('/foo/');
    expect(normalizeBasePath('foo/bar')).toBe('/foo/bar/');
  });

  it('sanitizes invalid legacy paths', () => {
    expect(sanitizeLegacyPath('legacy/index.html')).toBe('legacy/index.html');
    expect(sanitizeLegacyPath('/legacy/index.html')).toBe('legacy/index.html');
    expect(sanitizeLegacyPath('https://evil.tld/x')).toBe('legacy/index.html');
    expect(sanitizeLegacyPath('../escape')).toBe('legacy/index.html');
  });

  it('buildLegacyGameUrl always returns same-origin relative path', () => {
    expect(buildLegacyGameUrl({ basePath: '/app/', mode: 'play' })).toBe('/app/legacy/index.html?mode=play');
    expect(buildLegacyGameUrl({ basePath: '/app', mode: 'status' })).toBe('/app/legacy/index.html?mode=status');
    expect(buildLegacyGameUrl({ basePath: '/app', mode: 'bad', legacyPath: 'https://evil' })).toBe('/app/legacy/index.html?mode=play');
  });
});
