"use strict";

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        context: path.resolve(''),
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {silent: true}
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.ts']
        },
        output: {
            path: path.join(__dirname, './lib'),
            filename: 'index.js',
        },
        plugins: [
            new UglifyJsPlugin(),
        ]
    };

};
