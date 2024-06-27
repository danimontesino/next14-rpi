/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: '*.cdninstagram.com',
            },
        ],
    },
};

export default nextConfig;
