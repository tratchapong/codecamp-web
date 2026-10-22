import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp", "argon2"],
  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: "/uploads/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/cc24",
        destination:
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNE6Tw66t91oYE76GUoZINCgypbw0G1BnBlx8x371oWSllZIbHWTURJjzztHfJRqtpbviaINrPPcVS/pubhtml?gid=233384349&single=true",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/cc24",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
