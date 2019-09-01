const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = (env) => {
  
  const isProduction = !!env;
  const ExtractCSS = new ExtractTextPlugin("styles.css");
  return  {
    entry: './playground/class.js',
    output: {
      path: path.join(__dirname, 'playground/'),
      filename: 'bundle.js'
    },
    
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/i,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
            'env', 
            'react'
            ],
            plugins: [
            'transform-class-properties',
            ],
          },
        },
        {
        test: /\.(c|le)ss$/i,
        use: ExtractCSS.extract({
          //fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          }
          ],
        }),
       /* use: [
          'style-loader',
          'css-loader',
          // 'sass-loader',
          // 'less-loader',
        ],*/
        exclude: /node_modules/,
      },
      ], 
    },
    devtool: isProduction? 'source-map' : 'cheap-module-eval-source-map' /* inline-source-map */,
    devServer: {
      contentBase: path.join(__dirname, 'playground/'),
      historyApiFallback: true,
    },
    plugins: [
      ExtractCSS
    ],
    mode: isProduction ? 'production' : 'development',
  };
  
};

