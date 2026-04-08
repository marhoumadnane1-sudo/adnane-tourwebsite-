/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/adnane-tourwebsite-',
    images: {
          unoptimized: true,
          remotePatterns: [
            {
                      protocol: 'https',
                      hostname: 'images.unsplash.com',
            },
            {
                      protocol: 'https',
                      hostname: 'plus.unsplash.com',
            },
            {
                      protocol: 'https',
                      hostname: 'iprenders.blob.core.windows.net',
            },
            {
                      protocol: 'https',
                      hostname: 'images.netdirector.auto',
            },
            {
                      protocol: 'https',
                      hostname: 'i.ytimg.com',
            },
            {
                      protocol: 'https',
                      hostname: 'www.shutterstock.com',
            },
            {
                      protocol: 'https',
                      hostname: 'pre-webunwto.s3.eu-west-1.amazonaws.com',
            },
            {
                      protocol: 'https',
                      hostname: 'mnarcastle.ma',
            },
            {
                      protocol: 'https',
                      hostname: 'primemoroccotours.com',
            },
            {
                      protocol: 'https',
                      hostname: 'www.topmorocco.com',
            },
                ],
    },
};

module.exports = nextConfig;
