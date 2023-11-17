import { defineConfig } from 'astro/config';
import pagefind from "./lib/astro-pagefind/pagefind.ts"
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    build: {
        inlineStylesheets: 'always',
        assets: 'assets/docs/_astro'
    },

    integrations: [tailwind(), pagefind({site: 'dist', outputSubdir: 'assets/docs/pf'})]
})
