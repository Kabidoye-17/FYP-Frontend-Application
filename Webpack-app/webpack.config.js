
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const pkg = require("./package.json");
const commonPaths = require("./build_utils/config/commonPaths");
const port = process.env.PORT || 3000;

module.exports = (_, argv = {}) => ({
  // Entry point: where webpack starts bundling your application
  entry: commonPaths.entryPath,

  // Output configuration: where and how to save the bundled files
  output: {
    publicPath: "/",
    path: commonPaths.outputPath,
    clean: true,

    // contenthash is more stable than chunkhash — only changes when actual content changes
    filename: `${pkg.version}/js/[name].[contenthash:8].js`,
    chunkFilename: `${pkg.version}/js/[name].[contenthash:8].js`,
  },

  // Source maps: hidden in production (no URL comment), eval-based in dev for speed
  devtool:
    argv.mode === "production" ? "hidden-source-map" : "eval-source-map",

  // Plugins extend webpack's functionality
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_VERSION": JSON.stringify(pkg.version),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", globOptions: { ignore: ["**/index.html"] } },
      ],
    }),
  ],

  // Development server configuration
  devServer: {
    port: port,
    static: [
      {
        directory: commonPaths.outputPath,
      },
      { directory: path.resolve(__dirname, "public"), publicPath: "/" },
    ],
    historyApiFallback: {
      index: "index.html",
    },
    hot: true,
  },

  // Optimization: code splitting, minification, and runtime extraction
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 2022,
          compress: true,
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },

  // Module rules: how to process different file types
  module: {
    rules: [
      {
        // Process TypeScript files with ts-loader
        // include is faster than exclude — skips directory traversal outside src/
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        // Process CSS files
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // Module resolution
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
  },

});
