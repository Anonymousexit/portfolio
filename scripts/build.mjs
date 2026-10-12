import { cp, lstat, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as bundle } from 'esbuild';

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const outputDirectory = path.join(projectRoot, 'dist');

export async function build() {
  const sourceDirectory = path.join(projectRoot, 'src');
  const publicDirectory = path.join(projectRoot, 'public');
  // Validate the fixed generated directory before replacing it. Never follow a symlink.
  const existing = await lstat(outputDirectory).catch((error) => {
    if (error.code !== 'ENOENT') throw error;
    return null;
  });
  if (existing?.isSymbolicLink() || path.dirname(outputDirectory) !== projectRoot) {
    throw new Error('Refusing to replace an output directory outside this project.');
  }
  if (
    existing &&
    (await realpath(outputDirectory)) !== path.join(await realpath(projectRoot), 'dist')
  ) {
    throw new Error('The output directory must resolve inside this project.');
  }

  // Read the stylesheet inputs first so a missing source file does not erase a working build.
  const entry = await readFile(path.join(sourceDirectory, 'styles/main.css'), 'utf8');
  const imports = [...entry.matchAll(/@import\s+['"]([^'"]+)['"];?/g)];
  const styles = await Promise.all(
    imports.map(async ([, filename]) => {
      const contents = await readFile(path.join(sourceDirectory, 'styles', filename), 'utf8');
      return `/* ${filename} */\n${contents}`;
    }),
  );
  await readFile(path.join(sourceDirectory, 'index.html'), 'utf8');
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(path.join(sourceDirectory, 'index.html'), path.join(outputDirectory, 'index.html'));
  await cp(path.join(sourceDirectory, 'styles'), path.join(outputDirectory, 'styles'), {
    recursive: true,
  });
  await cp(publicDirectory, outputDirectory, { recursive: true });
  await bundle({
    entryPoints: [path.join(sourceDirectory, 'scripts/main.js')],
    outfile: path.join(outputDirectory, 'scripts/main.js'),
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['es2022'],
    legalComments: 'linked',
  });
  // Keep the original cascade while removing CSS import waterfalls in the published site.
  await writeFile(path.join(outputDirectory, 'styles/main.css'), styles.join('\n'));
  console.log('Built portfolio into dist/.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await build();
}
