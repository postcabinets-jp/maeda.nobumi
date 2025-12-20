import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Vercelでは環境変数が自動的に利用可能
    // ビルド時に環境変数を読み込む
    const apiKey = process.env.GEMINI_API_KEY || '';
    
    // デバッグ用（ビルド時にログ出力）
    if (process.env.VERCEL) {
      console.log('Vercel build - GEMINI_API_KEY:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    }
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(apiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
