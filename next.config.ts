const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'standalone', // necesario para Netlify
};

module.exports = withNextIntl(nextConfig);

