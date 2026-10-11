import { defineConfig } from 'vite';
import { sallaBuildPlugin, sallaDemoPlugin, sallaTransformPlugin } from '@salla.sa/twilight-bundles/vite-plugins';
import { tarwadahDemoPages } from './scripts/demo-plugin';

export default defineConfig({
  plugins: [sallaTransformPlugin(), sallaBuildPlugin(), sallaDemoPlugin(), tarwadahDemoPages()],
  // Browser editor drafts belong to this exact origin. Do not silently move
  // to another port and make saved edits appear to have disappeared.
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  // Local editor uploads are not storefront assets. Keep them out of the bundle.
  build: { copyPublicDir: false },
});
