const path = require('path');
const webpack = require('webpack');

const TerserJSPlugin = require('terser-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const autoprefixer = require('autoprefixer');

//const ErudaWebpackPlugin = require('eruda-webpack-plugin');


module.exports = (env) => {
  const publicPath = path.join(__dirname, '../public/dist');
  const isProduction = !!env;
  
  if(!isProduction) {
    require('dotenv').config({path: '.test'});
  }

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
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use: [
            'file-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ]
        },
        
        {
          test: /\.less$/i,
         
          use: [
          isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
          {
            loader:  'css-loader',
          },
          {
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
          },
         ]
        
        },//end less loader
        
        
       {
          test: /\.css$/i,
         
          use: [
          isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader' },
          {
            loader:  'css-loader',
          },
          {
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
        
         ]
        
        },//end css loader
      ], // end rules
    },
    devtool: isProduction? 'source-map' : 'cheap-module-eval-source-map' /* inline-source-map */,
    devServer: {
      contentBase: publicPath,
      historyApiFallback: true,
    },
    optimization: { 
      minimizer: [
        new TerserJSPlugin({}), 
        new OptimizeCSSAssetsPlugin({})
      ], 
    }, 
    plugins: [ 
      new MiniCssExtractPlugin({ 
      filename: '/css/styles.css', 
      chunkFilename: '[id].css', 
      }),
      /*new ErudaWebpackPlugin({ 
      entry: /bundle\.js$/ ,
      plugins: [ 'code', 'dom']
      }),*/
      new webpack.DefinePlugin({ 
      "process.env": JSON.stringify(process.env)
      }),
    ],
  
    mode: isProduction ? 'production' : 'development',
  };
  
};