// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: `
          default-src 'self';
          script-src 'self' https://www.google.com https://www.gstatic.com 'unsafe-inline';
          frame-src https://www.google.com;
          style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
          object-src 'none';
        `.replace(/\n/g, ""),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
