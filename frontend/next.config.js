/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para API routes que serán proxy hacia el backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
        // En producción, esta será la URL del backend
      },
    ];
  },
}

module.exports = nextConfig
