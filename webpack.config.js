/* eKMAP */
var webpack = require('webpack');
module.exports = {
    entry: {},
    output: {
        path: __dirname + '/dist',
        filename: 'ekmap-client.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    plugins: [],
    loaders: [
        { test: /\.js$/, loader: 'babel', query: {compact: false} }
    ],
    
};