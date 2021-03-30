const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withReactSvg = require('next-react-svg');
const path = require('path');

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.yml$/,
      use: 'raw-loader'
    });
    return config;
  }
}

module.exports = withPlugins([
  [withImages, {
    exclude: path.resolve(__dirname, "src/assets/svgs"),
    fileExtensions: ["jpg", "jpeg", "png", "gif"]
  }],
  [withReactSvg, {
    include: path.resolve(__dirname, "src/assets/svgs")
  }]
], nextConfig);