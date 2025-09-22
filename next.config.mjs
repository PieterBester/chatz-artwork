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
  }
};

export default nextConfig;
