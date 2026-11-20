/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const apiOrigin = new URL(apiUrl).origin;

const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob: https://*.r2.dev https://*.cloudflarestorage.com ",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self' ${apiOrigin} https://api.brevo.com`,
  "font-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.cloudflarestorage.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;