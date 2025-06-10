const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chatbot-test-william.min.js',
    library: 'ChatbotTest',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // use: 'ts-loader',
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css'})
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
