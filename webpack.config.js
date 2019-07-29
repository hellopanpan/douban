var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    build: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './doudou/dist'),
    publicPath: '/doudou/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
	  {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'less-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      /*{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        },

      },*/
      /*{
       test: /\.(png|jpg|gif|svg)$/,
       loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
       }*/
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash:8]'
            }
        }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    proxy: {
      "/cross": {
        target: 'http://localhost:3000',
        pathRewrite:{"^/cross": ""},
        onProxyReq: function(proxyReq, req, res) {
          var log = proxyReq.method + '------>' + proxyReq.path
          console.info(log)
        }
      },
      "/doulib": {
        target: 'http://localhost:8081',
        pathRewrite:{"^/doulib": ""},
        onProxyReq: function(proxyReq, req, res) {
          var log = proxyReq.method + '------>' + proxyReq.path
          console.info(log)
        }
      }
    },
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'build',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),   
  ])
}
