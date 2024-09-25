import { defineConfig } from 'vite';
import React from 'react';// ou react, selon votre projet

export default defineConfig({
  plugins: [React],
  server: {
    fs: {
      allow: [
        '/Users/valentinbercker/Desktop/BERCKER_JO_STUDI-main-5/front', // Ajoutez le chemin que vous souhaitez autoriser
        '/Users/valentinbercker/node_modules/vite/dist/client' // Ajoutez ce chemin si nécessaire
      ]
    }
  }
});