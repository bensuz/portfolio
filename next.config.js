/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pin the workspace root; a stray lockfile higher up would otherwise be picked up.
    turbopack: { root: __dirname },
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;
