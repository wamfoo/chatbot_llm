

const path = require('path');

module.exports = {
  mode: 'production', 
  entry: './src/umd.tsx',   
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'chatbot-test-william.umd.js',
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
            // configFile: 'tsconfig.umd.json',
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
