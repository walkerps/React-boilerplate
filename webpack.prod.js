var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var TersetJsPlugin = require('terser-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliWebpackPlugin = require('brotli-webpack-plugin');
var OfflinePlugin = require('offline-plugin');

module.exports = {
    mode:"production",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename: "[name].[contentHash].bundle.js"
    },
    optimization: {
        minimizer:[new TersetJsPlugin({}), new OptimizeCssAssetsPlugin({})],
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name:"vendor",
                    chunks:"all"
                }
            }
        }
    },
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
                            plugins: () => [autoprefixer()]
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
        new WebpackCleanupPlugin(),
        new MiniCssExtractPlugin({
            filename:"[name].[contentHash].bundle.css"
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new BrotliWebpackPlugin({
            asset: "[path].br[query]",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new OfflinePlugin()
    ]
}