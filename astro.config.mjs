import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://2fa-authenticator.cl',
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: false,
    },
    runtime: {
      mode: 'local',
    },
  }),
  experimental: {
    serverIslands: true,
  },
  integrations: [
    tailwind(),
    starlight({
      title: '2FA-Authenticator',
      favicon: '/favicon.ico',
      description: '2FA-Authenticator is a simple and secure 2FA authenticator app.',
      logo: {
        src: './public/img/icon-128.webp',
      },
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en',
        },
        es: {
          label: 'Español',
          lang: 'es',
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          translations: {
            en: 'Getting Started',
            es: 'Empezando',
          },
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          label: 'Add Account',
          translations: {
            en: 'Add Account',
            es: 'Agregar Cuenta',
          },
          autogenerate: { directory: 'docs/add-account' },
        },
        {
          label: 'Backups',
          translations: {
            en: 'Backups',
            es: 'Respaldos',
          },
          autogenerate: { directory: 'docs/backups' },
        },
      ],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '~': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
      },
    },
    ssr: {
      // This should be removed once Starlight's SSR support is released
      external: ['node:url', 'node:path', 'node:child_process', 'node:fs'],
    },
  },
});
