
import type {NextConfig} from 'next';

const faviconSvg = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='50' fill='hsl(231, 48%, 48%)' /%3e%3ctext y='.9em' x='50%' text-anchor='middle' font-size='60' font-family='Arial' fill='hsl(228, 55%, 99%)'%3eV%3c/text%3e%3c/svg%3e";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
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
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: faviconSvg,
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
