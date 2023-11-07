import { defineCollection } from 'astro:content';

const docsCollection = defineCollection({ type: 'content' });

export const collections = {
  'docs': docsCollection,
};
