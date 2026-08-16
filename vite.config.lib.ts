import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// Optional but recommended: npm install vite-plugin-dts -D
// import dts from 'vite-plugin-dts'; 

export default defineConfig({
  plugins: [
    react(),
    // dts({ insertTypesEntry: true }) // Uncomment this if you want Vite to generate .d.ts files
  ],
  build: {
    // We output the library to a folder named "dist-lib" to separate it from the Netlify website build
    outDir: 'dist-lib', 
    lib: {
      // POINT THIS TO YOUR MAIN EXPORT FILE
      entry: resolve(__dirname, 'src/index.ts'), 
      name: 'EaseUI',
      formats: ['es', 'umd'],
      fileName: (format) => `ease-ui.${format}.js`,
    },
    rollupOptions: {
      // 1. THIS is what prevents the Netlify error, isolated to the library build
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // 2. Provides global variables for UMD builds
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});