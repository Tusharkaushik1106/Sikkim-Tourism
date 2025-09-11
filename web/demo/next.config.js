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
      'cdn.lordicon.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
  "img.favpng.com",
  "encrypted-tbn0.gstatic.com",
  "tripxl.com",
  "amuseapp.art",
  "imgcdn.stablediffusionweb.com",
  "www.hrw.org"
],
  },
}

module.exports = nextConfig
