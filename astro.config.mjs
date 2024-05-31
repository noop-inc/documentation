import { defineConfig } from 'astro/config';
import pagefind from "./lib/astro-pagefind/pagefind.ts"
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    build: {
        inlineStylesheets: 'always',
        assets: 'assets/docs/_astro'
    },
    site: 'https://noop.dev',
    integrations: [tailwind(), mdx(), pagefind({site: 'dist', outputSubdir: 'assets/docs/pf'})]
})
