var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');

//Package version
let moduleVersion = process.env.moduleVersion || "es5";

//configuration
module.exports = {

    moduleVersion: moduleVersion,

    mode: "development",
    entry: {},

    output: function (libName, productName) {
        let fileName = moduleVersion === 'es6' ? `${productName}-${moduleVersion}` : `${productName}`;
        return {
            path: `${__dirname}/../dist/${libName}/`,
            filename: `${fileName}.js`
        }
    },

    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.js', '.json', '.css']
    },

    externals: {
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()'
    },

    module: {
        rules: {
            img: {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 150000
                    }
                }]
            },

            eslint: {
                // test: [/\.js$/],
                // exclude: /node_modules/,
                // enforce: 'pre',
                // loader: 'eslint-loader',
                // options: {
                //     failOnError: true
                // }
            },

            css: {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader'
                    }
                })
            }
        }
    },


    bannerInfo: function (libName) {
        return `
         ${libName}.(${pkg.homepage})
         Copyright© 2009 - 2020 eKGIS
         license: ${pkg.license}
         version: v${pkg.version}
        `;
    },

    plugins: function (libName, productName) {
        return [
            new webpack.BannerPlugin(this.bannerInfo(productName)),
             new ExtractTextPlugin(`./${productName}.css`),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    }
};