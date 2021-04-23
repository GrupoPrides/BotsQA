const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader' 
                }
            },
            {
                test: /\.css$/, 
                exclude: /node_modules/,
                use: [
                    'style-loader','css-loader' 
                ]                                    
            },
            {
                test: /\.(gif|svg|jpg|png|ico)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader' 
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html' 
        })
    ]
}