const path = require("path");

var debug = process.env.NODE_ENV !== 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    devtool: "source-map",
    devServer: {
        compress: true,
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
            DEBUG: JSON.stringify(debug)
        }),
        new CopyWebpackPlugin
        ([
            {from: path.resolve(__dirname,'./game/assets'), to: path.resolve(__dirname, (debug ?'./dev/assets' :'./build/assets'))},
        ]),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            cache: false
        })
    ],

    entry: "./game/src/app.ts",
    mode:debug ?"development":"production",
    output: {
        path: path.resolve(__dirname, (debug ?'./dev/' :'./build/')),
        filename: "game.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: ['node_modules', 'src/']
    }
 
};
