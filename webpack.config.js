// webpack.config.js

module.exports = {
  // other webpack configuration options...
  resolve: {
    fallback: {
      "fs": false, // or require.resolve("browserify-fs")
      "path": require.resolve("path-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "net": require.resolve("net-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
    }
  }
};
