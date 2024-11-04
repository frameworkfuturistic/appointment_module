/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['loremflickr.com', 'images.pexels.com', 'gratisography.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5555',
        pathname: '/gallery/**',
      },
    ],
  },
};

export default nextConfig;
