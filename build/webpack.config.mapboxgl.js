const configBase = require('./webpack.config.base');
const libName = 'mapboxgl';
const productName = 'ekmap-mapboxgl';

module.exports = {
  mode: configBase.mode,
  entry: configBase.entry,
  output: configBase.output(libName, productName),
  optimization: configBase.optimization,
  performance: configBase.performance,
  resolve: configBase.resolve,
  devServer: {
     contentBase: './dist',
  },
  externals: Object.assign({}, configBase.externals, {
    'mapbox-gl': 'mapboxgl'
  }),

  module: {
    noParse: /[\/\\]node_modules[\/\\]mapbox-gl[\/\\]dist[\/\\]mapbox-gl\.js$/,

    rules: (function() {
      let moduleRules = [];
      moduleRules.push(configBase.module.rules.img);
      moduleRules.push(configBase.module.rules.eslint);
      if (configBase.moduleVersion === 'es5') {
        moduleRules.push({
          test: [/\.js$/],
          exclude: /node_modules[\/\\]proj4|classic|webgl-debug/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        });
      }
      moduleRules.push(configBase.module.rules.css);
      return moduleRules;
    })()
  },
  plugins: configBase.plugins(libName, productName)
};
