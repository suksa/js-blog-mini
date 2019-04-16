var path = require('path');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            "targets": ["last 2 version", "ie 9"]
                        }
                    ]
                ],
            },
            exclude: ['/node_modules'],
        }],
    },
    plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
}