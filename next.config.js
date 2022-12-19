/** @type {import('next').NextConfig} */
const express = require('express')
const cors = require('cors')

module.exports = {
  // other configuration options here
  // ...
  // Enable CORS
  serverMiddleware: (app) => {
    app.use(cors())
  },
}

const nextConfig = {
  //reactStrictMode: true,
  swcMinify: true,
}

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
