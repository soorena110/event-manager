"use strict";

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    return {
        context: path.resolve(''),
        entry: env.dev ? './src/_dev/index.tsx' : './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {silent: true}
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.ts', '.js', '.tsx']
        },
        output: {
            path: path.join(__dirname, './lib'),
            filename: 'index.js',
            library: 'ModeManagement',
            libraryTarget: "umd"
        },
        devServer: {
            contentBase: './src/_dev',
            hot: true
        },
        plugins: [
            new UglifyJsPlugin(),
        ]
    };

};
