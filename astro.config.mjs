import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
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
      favicon: '/public/favicon.ico',
      description: '2FA-Authenticator is a simple and secure 2FA authenticator app.',
      logo: {
        src: './public/icon-128.png',
      },
      pagefind: false,

      defaultLocale: 'docs',
      locales: {
        docs: {
          label: 'Español',
          lang: 'es',
        },
      },
    }),
  ],
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['es', 'en'],
  // },
  routing: {
    prefixDefaultLocale: false,
    redirectToDefaultLocale: true,
  },
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
