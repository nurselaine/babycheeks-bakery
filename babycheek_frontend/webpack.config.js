const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path"); // built in node package handle file path in node project

module.exports = {
  entry: './index.js', // main file/entry of app
  mode: 'development',
  output: { // specifies where webpack puts its files after building. provide a path and filename
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  target: 'web', // specifies where app will run
  devServer: { // specifies development server settings
    port: '5000', // port app will run once started
    static: { // specifies directory webpack will use to serve static files
      directory: path.join(__dirname, 'public')
    },
    open: true, // automatically open browser after its bundled all files
    hot: true, // enables Hot module replacement exchanges, adds, removes while app is running without a full reload (improve optimization)
    liveReload: true, // automatically update app as changes are made
  },
  resolve: { // tells webpack to accept serveral extensions
    extensions: ['.js', '.jsx', '.json'],
  },
  module: { // rules about how webpack will handle different files when building app
    rules: [ // while building, when js or jsx file is reached that babel-loader package must be used
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  plugins: [ // 
    new HtmlWebpackPlugin({ // will generate html files for bundles and tell webpack to use generated html file in public folder as template
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
};