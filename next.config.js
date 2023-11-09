/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jkbdulihyfxlypniuvhh.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig