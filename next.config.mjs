/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { 
    dangerouslyAllowSVG: true, 
    remotePatterns: [],
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['fabric']
  },
  // Ensure proper port handling for Render
  env: {
    PORT: process.env.PORT || '3000'
  }
};

export default nextConfig;
