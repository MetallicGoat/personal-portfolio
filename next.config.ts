import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    // /_next/image rejects any quality not listed here, the lightbox asks for q=90
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;