
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
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        
        // Supprime la génération d'un JS séparé pour le calculateur
        // if (entries['calculator']) {
        //    delete entries['calculator'];
        // }
        
        if (entries['app/page']) {
           entries['main'] = entries['app/page'];
           delete entries['app/page'];
        }

        return entries;
      };

      config.output.filename = 'static/js/[name].js';
      
      // On ne génère plus de chunk JS séparés pour simplifier l'intégration
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
        // Force la sortie de tout le CSS dans un seul fichier
        miniCssExtractPlugin.options.filename = 'static/css/main.css';
        delete miniCssExtractPlugin.options.chunkFilename;
      }
    }
    return config;
  },
};

export default nextConfig;
