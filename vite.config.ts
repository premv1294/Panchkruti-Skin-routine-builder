import {dependencyFiles} from './scripts/dependency-files';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({base:process.env.BASE_PATH || '/',plugins:[react(),tailwindcss()],resolve:{alias:{'@':path.resolve(import.meta.dirname,'src')}},optimizeDeps:{esbuildOptions:{plugins:[dependencyFiles()]}},build:{outDir:'dist/public'},server:{host:'127.0.0.1',port:Number(process.env.PORT)||5173},preview:{host:'127.0.0.1',port:4173}});
