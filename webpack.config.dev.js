const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HMRConfig = new webpack.HotModuleReplacementPlugin();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body',
});
const CopyAssetPluginConfig = new CopyWebpackPlugin([
    { from: './src/assets/images', to: './assets/images' },
    { from: './src/assets/js', to: './assets/js' },
]);
const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'style.css',
    disable: false,
    allChunks: true
});

module.exports = {
    entry:[
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        './src/index.js',
        './src/assets/styles/style.scss'
      ],
    output:{
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js',
    },
    module:{
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ 
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: { sourceMap: false } 
                        }, 
                    ], 
                }),
            },
        ]
    },
    plugins:[
        ExtractTextPluginConfig,
        HtmlWebpackPluginConfig,
        CopyAssetPluginConfig,
        HMRConfig,
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'cheap-source-map',
    target: 'web',
    devServer: {
        historyApiFallback: true,
        hot: true,
        contentBase: path.join(__dirname, "build"),
        publicPath: '/',
        port: 9000
      }
}