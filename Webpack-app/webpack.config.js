// Webpack Configuration File

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const package = require("./package.json");
const commonPaths = require("./build_utils/config/commonPaths");
const isDebug = !process.argv.includes("release");
const port = process.env.PORT || 3000;

module.exports = {
  // Entry point: where webpack starts bundling your application
  entry: commonPaths.entryPath,

  // Output configuration: where and how to save the bundled files
  output: {
    uniqueName: package.name, 
    publicPath: "/",
    path: commonPaths.outputPath, 

    // Main JavaScript bundle naming pattern
    // Entry point file bundles
    // Example: 1.0.0/js/main.a1b2c3d4.js
    filename: `${package.version}/js/[name].[chunkhash:8].js`,

    // Code-split chunk files naming pattern (for lazy-loaded modules)
    chunkFilename: `${package.version}/js/[name].[chunkhash:8].js`,

    // Asset files (images, fonts, etc.) naming pattern
    // Debug mode: keeps original path and name for easier debugging
    // Production mode: only uses hash for smaller file names
    assetModuleFilename: isDebug
      ? `images/[path][name].[contenthash:8][ext]`
      : `images/[path][contenthash:8][ext]`,

    // Enable CORS for loading assets from CDN (set to "anonymous" for security)
    crossOriginLoading: "anonymous",
  },

  // Plugins extend webpack's functionality
  plugins: [
    // Define environment variables for browser code
    // This replaces process.env.* with actual values at build time
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL || ""),
      "process.env.REACT_APP_VERSION": JSON.stringify(package.version),
      "process.env.REACT_APP_FEATURE_ANALYTICS": JSON.stringify(process.env.REACT_APP_FEATURE_ANALYTICS || "true"),
      "process.env.REACT_APP_FEATURE_CALENDAR": JSON.stringify(process.env.REACT_APP_FEATURE_CALENDAR || "true"),
      "process.env.REACT_APP_FEATURE_TEAM": JSON.stringify(process.env.REACT_APP_FEATURE_TEAM || "true"),
      "process.env.REACT_APP_FEATURE_ROADMAP": JSON.stringify(process.env.REACT_APP_FEATURE_ROADMAP || "true"),
      "process.env.REACT_APP_FEATURE_WORKLOAD": JSON.stringify(process.env.REACT_APP_FEATURE_WORKLOAD || "true"),
      "process.env.REACT_APP_FEATURE_RICH_TEXT": JSON.stringify(process.env.REACT_APP_FEATURE_RICH_TEXT || "true"),
      "process.env.REACT_APP_FEATURE_KEYBOARD_SHORTCUTS": JSON.stringify(process.env.REACT_APP_FEATURE_KEYBOARD_SHORTCUTS || "true"),
      "process.env.REACT_APP_FEATURE_COMMAND_PALETTE": JSON.stringify(process.env.REACT_APP_FEATURE_COMMAND_PALETTE || "true"),
      "process.env.REACT_APP_FEATURE_BULK_OPS": JSON.stringify(process.env.REACT_APP_FEATURE_BULK_OPS || "true"),
      "process.env.REACT_APP_FEATURE_IMPORT_EXPORT": JSON.stringify(process.env.REACT_APP_FEATURE_IMPORT_EXPORT || "true"),
      "process.env.REACT_APP_FEATURE_NOTIFICATIONS": JSON.stringify(process.env.REACT_APP_FEATURE_NOTIFICATIONS || "true"),
      "process.env.REACT_APP_FEATURE_TIME_TRACKING": JSON.stringify(process.env.REACT_APP_FEATURE_TIME_TRACKING || "true"),
      "process.env.REACT_APP_FEATURE_DEPENDENCIES": JSON.stringify(process.env.REACT_APP_FEATURE_DEPENDENCIES || "true"),
      "process.env.REACT_APP_MOCK_API": JSON.stringify(process.env.REACT_APP_MOCK_API || "false"),
    }),
    // Automatically generates an HTML file that includes your bundled JavaScript
    // Takes public/index.html as template and injects <script> tags
    new HtmlWebpackPlugin({
      template: "public/index.html", // Source HTML template
      filename: "index.html", // Output filename in build/
    }),
    new CopyWebpackPlugin({
    patterns: [{ from: "public", globOptions: { ignore: ["**/index.html"] } }],
  }),
  ],

  // Development server configuration (used when running npm start)
  devServer: {
    port: port, // Port to run dev server on (default: 3000)
    static: [{
      // Serve static files from this directory
      directory: commonPaths.outputPath,
    },  { directory: path.resolve(__dirname, "public"), publicPath: "/" },],
    // Enable HTML5 History API routing (for React Router, etc.)
    // Redirects all 404s to index.html so your SPA can handle routing
    historyApiFallback: {
      index: "index.html",
    },
    // Enable Hot Module Replacemen
    hot: true,
  },

  // Module rules: how to process different file types
  module: {
    rules: [
      {
        // Process TypeScript files with ts-loader first (to handle type imports)
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        // Process JavaScript and JSX files
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // Process CSS files
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // Module resolution: how webpack finds imported modules
  resolve: {
    // Allow importing files without specifying these extensions
    // Example: import App from './App' (will find App.js, App.jsx, App.ts, or App.tsx)
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
