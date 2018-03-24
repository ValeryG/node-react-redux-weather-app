module.exports = {
  entry: './src/app.js',
  output: {
    filename: './bundle.js'
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  mode: process.env['NODE_ENV']
};
