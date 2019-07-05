const withPlugins = require("next-compose-plugins");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const BrotliPlugin = require("brotli-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

// add bundle analyzer config
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

// fix: prevents error when .css files are required by node
// https://github.com/zeit/next.js/blob/master/examples/with-ant-design/next.config.js
if (typeof require !== "undefined") {
  require.extensions[".css"] = file => {}; // eslint-disable-line
}

// main next config, including webpack
const nextConfig = {
  distDir: "_next", // used to define the name of build dir, we need it to be _next, for serving gzip files

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 1000 * 60 * 60,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 10
  },

  // webpack config
  webpack: config => {
    // Add brotli plugin
    config.plugins.push(
      new BrotliPlugin({
        asset: "[path].br[query]",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7
      })
    );

    // Add gzip compression plugin
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.7
      })
    );
    return config;
  }
};

module.exports = withPlugins(
  [
    [withCss],
    [
      withSass,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: "[path]___[local]___[hash:base64:5]"
        }
      }
    ],
    [withBundleAnalyzer]
  ],
  nextConfig
);
