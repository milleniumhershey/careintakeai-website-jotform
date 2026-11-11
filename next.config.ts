import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/vital-signs", destination: "/vital-signs/index.html" },
      { source: "/vital-signs/", destination: "/vital-signs/index.html" },
      { source: "/calculator", destination: "/calculator/index.html" },
      { source: "/calculator/", destination: "/calculator/index.html" },
    ];
  },
};

export default nextConfig;
