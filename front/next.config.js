const dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

dotenv.config();

module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === 'production';
      return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins: [
          ...config.plugins,
          new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ],
      }
    },
    images: {
      domains: ['devwebdata2021.s3.ap-northeast-2.amazonaws.com'],
    },
    env: {
      baseURL: process.env.BASE_URL
    },
    async redirects() {
      return [];
    },
  })