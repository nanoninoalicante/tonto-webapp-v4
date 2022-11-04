/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  const env = {
    FEED_API_BASE_URL: process.env.FEED_API_BASE_URL || "https://webfeed-dev.apis.gettonto.com/",
  }
  return {
    env,
  }
}
