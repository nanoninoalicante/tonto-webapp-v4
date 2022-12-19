/** @type {import('next').NextConfig} */
const cors = require('cors');
const nextConnect = require('next-connect');

const nextConfig = {
  //reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConnect().use(cors({
  origin: 'origin',
  optionsSuccessStatus: 200
}));

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
}
