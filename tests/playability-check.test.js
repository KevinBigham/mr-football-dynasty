import { describe, expect, it } from 'vitest';

import {
  buildExpectedLegacyFiles,
  normalizeLegacyAssetPath,
  probeLegacyAssets,
  runPlayabilityCheck,
} from '../src/app/playability-check.js';
import { LEGACY_MANIFEST } from '../src/app/legacy-manifest.js';

describe('playability-check helpers', () => {
  it('buildExpectedLegacyFiles mirrors manifest-required files', () => {
    var files = buildExpectedLegacyFiles(LEGACY_MANIFEST);
    expect(files).toContain('legacy/index.html');
    expect(files).toContain('legacy/game.js');
    expect(new Set(files).size).toBe(files.length);
  });

  it('normalizes asset paths for probing', () => {
    expect(normalizeLegacyAssetPath('/legacy/game.js')).toBe('legacy/game.js');
    expect(normalizeLegacyAssetPath('\\legacy\\react.min.js')).toBe('legacy/react.min.js');
  });

  it('probeLegacyAssets returns missing files when probe fails', async () => {
    var out = await probeLegacyAssets(['legacy/index.html', 'legacy/game.js'], async function (path) {
      return path === 'legacy/index.html';
    });
    expect(out.ok).toBe(false);
    expect(out.missingFiles).toEqual(['legacy/game.js']);
    expect(out.checks.length).toBe(2);
  });

  it('runPlayabilityCheck handles invalid manifest safely', async () => {
    var out = await runPlayabilityCheck({ version: '', entry: '', files: [] }, async function () {
      return true;
    });
    expect(out.ok).toBe(false);
    expect(out.errors.length).toBeGreaterThan(0);
  });
});
