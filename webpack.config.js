const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const inProductionEnvironment = process.env['NODE_ENV'] === 'production';
const cssLoaderOptions = inProductionEnvironment ? {
  minimize: true
} : {
};
const sassLoading = inProductionEnvironment ? [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: cssLoaderOptions
  },
  'sass-loader'
] : [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
];

const config = {
  entry: './src/app.js',
  output: {
    filename: './bundle.js'
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      production: inProductionEnvironment
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: sassLoading
      }
    ]
  },
  mode: process.env['NODE_ENV'],
  devtool: inProductionEnvironment ? undefined : 'cheap-eval-source-map'
};

if (inProductionEnvironment) {
  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
  };
}

module.exports = config;
