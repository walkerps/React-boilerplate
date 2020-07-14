var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"[name].bundle.js"
    },
    devtool:"inline-source-map",
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader"],
                exclude:/\.module\.css$/
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:1,
                            modules:true
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options:{
                            plugins:() => [autoprefixer()]
                        }
                    }
                ],
                include:/\.module\.css$/
            },
            {
                test:/\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env","@babel/preset-react"]
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new MiniCssExtractPlugin()       
    ],
    devServer: {
        contentBase: path.resolve(__dirname,"dist"),
        compress:true,
        hot: true
    },
}