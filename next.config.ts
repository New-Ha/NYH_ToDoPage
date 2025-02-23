import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.forEach((rule: any) => {
      if (rule.test && rule.test.toString().includes("svg")) {
        rule.exclude = /\.svg$/;
      }
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(ts)x?$/],
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeAttrs: { attrs: "(fill)" },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
