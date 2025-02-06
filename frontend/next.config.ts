import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  webpack: (config: WebpackConfig) => {
    config.stats = 'errors-only'; 
    return config;
  },
};

export default nextConfig;