const path = require('path');
const babelEnvPreset = ['env', {
    "targets": {
        "browsers": ["last 2 versions"]
    }
}];

const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/../public/javascripts')
    },
    devtool    : 'source-map',
    resolve: {
        alias: {
            constants: path.resolve(__dirname, 'src/constants'),
            state: path.resolve(__dirname, 'src/state'),
            utils: path.resolve(__dirname, 'src/utils'),
            components: path.resolve(__dirname, 'src/components')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [babelEnvPreset, 'react'],
                        plugins: ['transform-object-rest-spread', 'transform-class-properties']
                    },
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]_[hash:base64:5]', // Add naming scheme
                        },
                    }
                ],
            },
            {
              test: /\.scss$/,
              use: [{
                      loader: "style-loader" // creates style nodes from JS strings
                  }, {
                      loader: "css-loader" // translates CSS into CommonJS
                  }, {
                      loader: "sass-loader" // compiles Sass to CSS
                  }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname
            }
        })
    ]
};
