import { readdir, readFile, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { projectRoot } from './build.mjs';

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? files(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    ),
  );
  return groups.flat();
}

let checked = 0;
for (const folder of ['src', 'scripts', 'tests']) {
  for (const filename of await files(path.join(projectRoot, folder))) {
    if (!/\.(js|mjs)$/.test(filename)) continue;
    const result = spawnSync(process.execPath, ['--check', filename], { encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr || `Could not check ${filename}`);
    const source = await readFile(filename, 'utf8');
    for (const [, target] of source.matchAll(/(?:from\s+|import\s*)['"](\.[^'"]+)['"]/g)) {
      await stat(path.resolve(path.dirname(filename), target));
    }
    checked++;
  }
}
console.log(`Checked syntax and relative imports in ${checked} JavaScript files.`);
