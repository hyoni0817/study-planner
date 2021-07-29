const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    images: {
      domains: ['devwebdata2021.s3.ap-northeast-2.amazonaws.com'],
    },
    env: {
      baseURL: process.env.BASE_URL
    },
    async redirects() {
      return [];
    },
  }