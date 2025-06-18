import type { NextConfig } from "next";


const inProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: inProduction ? "/unlimited-wordle" : "",
  assetPrefix: inProduction ? "/unlimited-wordle/" : ""
};

export default nextConfig;
