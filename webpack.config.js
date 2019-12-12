/* eslint-env node */

const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = filename => [path.resolve(__dirname, filename)];

module.exports = {
  mode: "production",

  entry: entry("src/index.js"),

  output: {
    filename: "[name].js",
    path: path.resolve("dist")
  },

  resolve: {
    extensions: [".js"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          // Extract the css to file
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve("css-loader"),
            options: {
              // Enable CSS modules
              modules: {
                // Specify format of class names
                localIdentName: "[local]_[hash:base64:5]"
              }
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              indent: "postcss",
              syntax: "postcss-scss",
              plugins: () => [
                // Purge unused CSS
                require("@fullhuman/postcss-purgecss")({
                  content: glob.sync("src/**/*.{js,jsx}", { nodir: true }),
                  extractors: [
                    {
                      extractor: class {
                        static extract(content) {
                          // NOTE: this regex needs work. At the moment it simply matches any keyword that matches a class name. If you were to have a class name "alert" and create a react component with a text body that has the word "alert" in it, it would result in the alert className being unnecessarily imported.
                          return content.match(/\w+/g) || [];
                        }
                      },
                      extensions: ["js", "jsx"]
                    }
                  ]
                }),
                require("cssnano")
              ]
            }
          },
          require.resolve("sass-loader")
        ]
      }
    ]
  },
  plugins: [
    // Extract all css into a separate file
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
