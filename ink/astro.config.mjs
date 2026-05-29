// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // For prefetching data and optimizing performance
  // https://docs.astro.build/en/guides/prefetch/
  devToolbar: {
    enabled: false
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});