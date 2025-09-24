
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Garde la configuration pour le build principal
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        
        // Ajoute notre point d'entrée pour le calculateur
        entries['calculator'] = './src/app/calculator-entry.tsx';
        
        // Ajuste le point d'entrée principal pour qu'il soit bien nommé 'main'
        if (entries['app/page']) {
           entries['main'] = entries['app/page'];
           delete entries['app/page'];
        }

        return entries;
      };

      config.output.filename = 'static/js/[name].js';
      config.output.chunkFilename = 'static/js/[name].chunk.js';
      
      if (config.optimization) {
        config.optimization.splitChunks = {
          cacheGroups: {
            default: false,
          },
        };
        config.optimization.runtimeChunk = false;
      }
      
      const miniCssExtractPlugin = config.plugins.find(
        (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
      );
      
      if (miniCssExtractPlugin) {
        miniCssExtractPlugin.options.filename = 'static/css/[name].css';
        miniCssExtractPlugin.options.chunkFilename = 'static/css/[name].chunk.css';
      }
    }
    return config;
  },
};

export default nextConfig;
