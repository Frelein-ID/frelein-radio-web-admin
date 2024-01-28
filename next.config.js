/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./public/images/loader.js",
  },
};

module.exports = nextConfig;
