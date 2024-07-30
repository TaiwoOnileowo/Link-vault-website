const path = require("path");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "linkvault.js",
  },
  module: {
    rules: [
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "videos/",
            },
          },
        ],
      },
    ],
  },
};
