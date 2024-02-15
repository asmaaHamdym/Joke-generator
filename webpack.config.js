module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.MyKey": JSON.stringify(process.env.MyKey),
    }),
  ],
};
