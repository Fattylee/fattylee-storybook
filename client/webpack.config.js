const path = require('path');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
//const autoprefixer = require('autoprefixer');

const ErudaWebpackPlugin = require('eruda-webpack-plugin');

module.exports = (env) => {
  const publicPath = path.join(__dirname, '../public/dist');
  const isProduction = !!env;
 // const ExtractCSS = new ExtractTextPlugin("styles.css");
  
  return  {
    entry: './src/index.js',
    output: {
      path: publicPath,
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
            //'env', 
            //'react'
            "@babel/env",
            ],
            plugins: [
            //'transform-class-properties',
           // 'transform-runtime',
           '@babel/plugin-proposal-class-properties',
           [
              "@babel/plugin-transform-runtime",
             /*{ 
             "absoluteRuntime": false,
             "corejs": false, 
             "helpers": true, 
             "regenerator": true, "useESModules": true 
             
             },*/
           ],
          
            ],
          },
        },
        {
          test: /\.css$/,
          use: [
          {
            loader: 'style-loader',
          },
          {
            loader:  'css-loader',
          },
         /* {
            loader: "postcss-loader",
  	          options: {
    	          plugins () {
    	            return autoprefixer({
    	          browsers: [
    	            "last 3 versions", 
    	            "> 1%"
    	          ]
    	          });
    	          },
            	}
         },
         {
            loader:  'less-loader',
          },*/
         ]
        },
       
      ], 
    },
    devtool: isProduction? 'source-map' : 'cheap-module-eval-source-map' /* inline-source-map */,
    devServer: {
      contentBase: publicPath,
      historyApiFallback: true,
    },
    plugins: [
      //ExtractCSS
    /*  new ErudaWebpackPlugin({ 
      entry: /bundle\.js$/ ,
      plugins: ['fps', 'timing', 'code', 'dom']
      }),*/
    ],
    mode: isProduction ? 'production' : 'development',
  };
  
};