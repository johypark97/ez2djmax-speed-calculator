import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  basename: process.env.GITHUB_BASE_PATH ?? '/',
} satisfies Config;
