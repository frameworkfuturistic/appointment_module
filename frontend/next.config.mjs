/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'loremflickr.com',
      'images.pexels.com',
      'gratisography.com',
      'localhost',
      'images.unsplash.com',
      'test.sjhrc.in' // Added the new domain here
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5555',
        pathname: '/gallery/**',
      },
      {
        protocol: 'https',
        hostname: 'test.sjhrc.in', // Added the new domain here
        pathname: '/hospital-api/**', // Allow paths under /hospital-api/
      }
    ],
  },
};

export default nextConfig;
