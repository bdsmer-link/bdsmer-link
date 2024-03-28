import { vercelEdgeAdapter } from '@builder.io/qwik-city/adapters/vercel-edge/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import vercel from 'vite-plugin-vercel';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    vercel: {
      isr: {
        "/": { expiration: 60 },
        "/helps": { expiration: 60 },
        "/skills": { expiration: 60 },
      },
    },
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.vercel-edge.tsx', '@qwik-city-plan'],
      },
      outDir: '.vercel/output/functions/_qwik-city.func',
    },
    plugins: [vercelEdgeAdapter(), vercel()],
  };
});
