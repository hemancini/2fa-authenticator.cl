import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  routing: {
    prefixDefaultLocale: false,
    redirectToDefaultLocale: true,
  },
});
