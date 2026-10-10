import { defineConfig } from 'vite';
import { sallaBuildPlugin, sallaDemoPlugin, sallaTransformPlugin } from '@salla.sa/twilight-bundles/vite-plugins';
import { tarwadahDemoPages } from './scripts/demo-plugin';

export default defineConfig({
  plugins: [sallaTransformPlugin(), sallaBuildPlugin(), sallaDemoPlugin(), tarwadahDemoPages()],
  server: { host: '127.0.0.1' },
});
