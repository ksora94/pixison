const webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./build/env"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
const alias = {
    '@': path.resolve(__dirname, 'src'),
    'assets': path.resolve(__dirname, 'src/assets'),
    'panel': path.resolve(__dirname, 'src/panel'),
    'css': path.resolve(__dirname, 'src/css')
};

const secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const notHotReload = ['content'];

const vendorModules = [
    'react'
];

const cssModulesConfig = {
    importLoaders: 2,
    modules: true,
    localIdentName: '[name]__[local]--[hash:base64:5]'
};

if (fileSystem.existsSync(secretsPath)) {
    alias["secrets"] = secretsPath;
}

const options = {
    entry: {
        vendor: vendorModules,
        panel: path.join(__dirname, "src/panel/index.js"),
        background: path.join(__dirname, "src/background.js"),
        content: path.join(__dirname, "src/content.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: cssModulesConfig
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
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
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader?name=[name].[ext]",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
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
        new CleanWebpackPlugin(["dist"]),
        // expose and write the allowed env vars on the compiled bundle
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
        }),
        new CopyWebpackPlugin([{
            from: "src/manifest.json",
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
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/panel/index.ejs"),
            filename: "panel.html",
            chunks: ["vendor", "panel"]
        }),
        new WriteFilePlugin(),
        new ExtractTextPlugin({
            filename: 'style.css'
        })
    ],
    customConfig: {}
};

if (env.NODE_ENV === "development") {
    options.devtool = "cheap-module-eval-source-map";
    options.customConfig.notHotReload = notHotReload;
}

module.exports = options;
