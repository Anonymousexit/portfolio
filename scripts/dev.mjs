import { watch } from 'node:fs';
import path from 'node:path';
import { build, projectRoot } from './build.mjs';
import { requestedPort, serve } from './serve.mjs';

await build();
const server = await serve({ port: requestedPort() });
let timer;
let builds = Promise.resolve();
const watchers = ['src', 'public'].map((directory) =>
  watch(path.join(projectRoot, directory), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      builds = builds
        .then(build)
        .then(() => console.log('Updated. Refresh your browser.'))
        .catch(console.error);
    }, 150);
  }),
);

function shutdown() {
  clearTimeout(timer);
  watchers.forEach((watcher) => watcher.close());
  server.close();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
