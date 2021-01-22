let configBase = require("./webpack.config.base");

//端名
const libName = "leaflet";
//产品包名
const productName = "ekmap-leaflet";

module.exports = {
    mode: configBase.mode,
    entry: configBase.entry,
    output: configBase.output(libName, productName),
    optimization: configBase.optimization,
    performance: configBase.performance,
    resolve: configBase.resolve,

    externals: Object.assign({}, configBase.externals, {
        'leaflet': 'L',
        '@turf/turf': "function(){try{return turf}catch(e){return {}}}()",
        'deck.gl': '(function(){try{return DeckGL}catch(e){return {}}})()',
        'luma.gl': '(function(){try{return luma}catch(e){return {}}})()',
        'webgl-debug': '(function(){try{return webgl-debug}catch(e){return {}}})()',
        'xlsx': "function(){try{return XLSX}catch(e){return {}}}()"
    }),

    module: {
        rules: (function() {
            let moduleRules = [];
            moduleRules.push(configBase.module.rules.img);
            moduleRules.push(configBase.module.rules.eslint);
            if (configBase.moduleVersion === "es5") {
                moduleRules.push({
                    test: [/\.js$/],
                    exclude: /setImmediate|webgl-debug/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                });
            }
            moduleRules.push(configBase.module.rules.css);
            return moduleRules
        })()
    },
    plugins: configBase.plugins(libName, productName)
};