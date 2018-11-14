const webpack = require('webpack'),
    path = require('path'),
    fileSystem = require('fs'),
    env = require('./build/env'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
const alias = {
    '~': path.resolve(__dirname, 'src'),
    'components': path.resolve(__dirname, 'src/components'),
    'assets': path.resolve(__dirname, 'src/assets'),
    'panel': path.resolve(__dirname, 'src/panel'),
    'option': path.resolve(__dirname, 'src/option'),
    'css': path.resolve(__dirname, 'src/css'),
    'js': path.resolve(__dirname, 'src/js')
};

const secretsPath = path.join(__dirname, ('secrets.' + env.NODE_ENV + '.js'));

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const notHotReload = ['content'];

const cssModulesConfig = {
    importLoaders: 2,
    modules: true,
    localIdentName: '[name]__[local]--[hash:base64:5]'
};

if (fileSystem.existsSync(secretsPath)) {
    alias['secrets'] = secretsPath;
}

const options = {
    entry: {
        panel: path.join(__dirname, 'src/panel/index.js'),
        option: path.join(__dirname, 'src/option/index.js'),
        background: path.join(__dirname, 'src/background.js'),
        content: path.join(__dirname, 'src/content.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }, {
                            loader: "less-loader",
                            options: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    'base-color': '#00b1d4',
                                    'icon-font-path': './fonts'
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: cssModulesConfig
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            size: 16,
                            publicPath: '/'
                        }
                    }
                ]
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: alias
    },
    plugins: [
        // clean the build folder
        new CleanWebpackPlugin(['dist']),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
        }),
        new CopyWebpackPlugin([{
            from: 'src/manifest.json',
            transform: function (content, path) {
                // generates the manifest file using the package.json informations
                return Buffer.from(JSON.stringify({
                    description: process.env.npm_package_description,
                    version: process.env.npm_package_version,
                    ...JSON.parse(content.toString())
                }))
            }
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            chunks: ['panel', 'option'],
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/panel/index.ejs'),
            filename: 'panel.html',
            chunks: ['vendor', 'panel']
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/option/index.ejs'),
            filename: 'option.html',
            chunks: ['vendor', 'option']
        }),
        new WriteFilePlugin(),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    customConfig: {}
};

if (env.NODE_ENV === 'development') {
    options.devtool = 'cheap-module-eval-source-map';
    options.customConfig.notHotReload = notHotReload;
}

if (env.NODE_ENV !== 'development') {
    options.plugins = options.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        })
    ]);
}

if (env.NODE_ENV === 'analyze') {
    options.plugins = options.plugins.concat([
        new BundleAnalyzerPlugin(
            {
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8001
            }
        )
    ])
}


module.exports = options;
