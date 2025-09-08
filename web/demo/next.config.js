/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'upload.wikimedia.org',
      'static.vecteezy.com',
      'www.transparentpng.com',
      'cdn.pixabay.com',
      'cdn.lordicon.com'
    ],
  },
}

module.exports = nextConfig
