// Webpack Configuration File

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const package = require("./package.json");
const commonPaths = require("./build_utils/config/commonPaths");
const isDebug = !process.argv.includes("release");
const port = process.env.PORT || 3000;

// Function form: allows --env flags (e.g. --env transpileOnly) for benchmark variants
module.exports = (env = {}, argv = {}) => ({
  // Entry point: where webpack starts bundling your application
  entry: commonPaths.entryPath,

  // Output configuration: where and how to save the bundled files
  output: {
    uniqueName: package.name,
    publicPath: "/",
    path: commonPaths.outputPath,
    clean: true,

    // contenthash is more stable than chunkhash — only changes when actual content changes
    filename: `${package.version}/js/[name].[contenthash:8].js`,
    chunkFilename: `${package.version}/js/[name].[contenthash:8].js`,

    // Asset files (images, fonts, etc.) naming pattern
    assetModuleFilename: isDebug
      ? `images/[path][name].[contenthash:8][ext]`
      : `images/[path][contenthash:8][ext]`,

    crossOriginLoading: "anonymous",
  },

  // Persistent filesystem cache with config-aware invalidation
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [
        __filename,
        path.resolve(__dirname, ".babelrc"),
        path.resolve(__dirname, "tsconfig.json"),
        path.resolve(__dirname, "package.json"),
      ],
    },
  },

  // Source maps: hidden in production (no URL comment), eval-based in dev for speed
  devtool:
    argv.mode === "production" ? "hidden-source-map" : "eval-source-map",

  // Plugins extend webpack's functionality
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        process.env.REACT_APP_API_URL || ""
      ),
      "process.env.REACT_APP_VERSION": JSON.stringify(package.version),
      "process.env.REACT_APP_FEATURE_ANALYTICS": JSON.stringify(
        process.env.REACT_APP_FEATURE_ANALYTICS || "true"
      ),
      "process.env.REACT_APP_FEATURE_CALENDAR": JSON.stringify(
        process.env.REACT_APP_FEATURE_CALENDAR || "true"
      ),
      "process.env.REACT_APP_FEATURE_TEAM": JSON.stringify(
        process.env.REACT_APP_FEATURE_TEAM || "true"
      ),
      "process.env.REACT_APP_FEATURE_ROADMAP": JSON.stringify(
        process.env.REACT_APP_FEATURE_ROADMAP || "true"
      ),
      "process.env.REACT_APP_FEATURE_WORKLOAD": JSON.stringify(
        process.env.REACT_APP_FEATURE_WORKLOAD || "true"
      ),
      "process.env.REACT_APP_FEATURE_RICH_TEXT": JSON.stringify(
        process.env.REACT_APP_FEATURE_RICH_TEXT || "true"
      ),
      "process.env.REACT_APP_FEATURE_KEYBOARD_SHORTCUTS": JSON.stringify(
        process.env.REACT_APP_FEATURE_KEYBOARD_SHORTCUTS || "true"
      ),
      "process.env.REACT_APP_FEATURE_COMMAND_PALETTE": JSON.stringify(
        process.env.REACT_APP_FEATURE_COMMAND_PALETTE || "true"
      ),
      "process.env.REACT_APP_FEATURE_BULK_OPS": JSON.stringify(
        process.env.REACT_APP_FEATURE_BULK_OPS || "true"
      ),
      "process.env.REACT_APP_FEATURE_IMPORT_EXPORT": JSON.stringify(
        process.env.REACT_APP_FEATURE_IMPORT_EXPORT || "true"
      ),
      "process.env.REACT_APP_FEATURE_NOTIFICATIONS": JSON.stringify(
        process.env.REACT_APP_FEATURE_NOTIFICATIONS || "true"
      ),
      "process.env.REACT_APP_FEATURE_TIME_TRACKING": JSON.stringify(
        process.env.REACT_APP_FEATURE_TIME_TRACKING || "true"
      ),
      "process.env.REACT_APP_FEATURE_DEPENDENCIES": JSON.stringify(
        process.env.REACT_APP_FEATURE_DEPENDENCIES || "true"
      ),
      "process.env.REACT_APP_MOCK_API": JSON.stringify(
        process.env.REACT_APP_MOCK_API || "false"
      ),
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
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 2022,
          compress: {
            passes: 2,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        "vendor-react": {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: "vendor-react",
          priority: 40,
        },
        "vendor-query": {
          test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
          name: "vendor-query",
          priority: 30,
        },
        "vendor-ui": {
          test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
          name: "vendor-ui",
          priority: 30,
        },
        "vendor-charts": {
          test: /[\\/]node_modules[\\/]recharts[\\/]/,
          name: "vendor-charts",
          priority: 30,
        },
        "vendor-editor": {
          test: /[\\/]node_modules[\\/]@tiptap[\\/]/,
          name: "vendor-editor",
          priority: 30,
        },
        "vendor-styled": {
          test: /[\\/]node_modules[\\/]styled-components[\\/]/,
          name: "vendor-styled",
          priority: 30,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
      },
    },
    runtimeChunk: "single",
  },

  // Module rules: how to process different file types
  module: {
    unsafeCache: true,
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
              transpileOnly: !!env.transpileOnly,
            },
          },
        ],
      },
      {
        // Process JavaScript and JSX files
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
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

  // Reduce console output in production builds
  stats: argv.mode === "production" ? "errors-warnings" : "normal",
});
