import { describe, expect, it } from 'vitest';

import { LEGACY_MANIFEST, validateLegacyManifest } from '../src/app/legacy-manifest.js';

describe('legacy-manifest', () => {
  it('validates canonical manifest', () => {
    var out = validateLegacyManifest(LEGACY_MANIFEST);
    expect(out.ok).toBe(true);
  });
});
