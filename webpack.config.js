module.exports = {
  mode: "development",
  /* starting point for our frontend JavaScript (place to enter when bundling) */
  entry: "./client/index.js",
  /* where to output our newly bundled file */
  output: {
    path: __dirname + "/public", // the ABSOLUTE path for the directory
    filename: "bundle.js", // the name of the file that will contain our output - we could name this whatever we want, but bundle.js is convention
  },
  devtool: "source-map",
  /* extra modules to incorporate when parsing files */
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
