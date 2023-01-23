import { defineConfig } from 'tsup';

import pkgJson from './package.json';

const external = [
  ...Object.keys((pkgJson as any).peerDependencies || {}),
  ...Object.keys((pkgJson as any).dependencies || {}),
];

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  dts: true,
  external,
});
