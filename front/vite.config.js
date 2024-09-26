import { defineConfig } from 'vite';
import React from 'react';// ou react, selon votre projet

export default defineConfig({
  plugins: [React],
  server: {
    fs: {
      allow: [
        '/Users/valentinbercker/Downloads/BERCKER_JO_STUDI-main-5/BERCKER_STUDI_DECEMBRE_25/front',
        '/Users/valentinbercker/Desktop/BERCKER_JO_STUDI-main-5/front',
        '/Users/valentinbercker/node_modules/vite/dist/client',
        '/Users/valentinbercker/Downloads/BERCKER_JO_STUDI-main-5/BERCKER_STUDI_DECEMBRE_25/front/node_modules/vite/dist/client'
      ]
    }
  }
});