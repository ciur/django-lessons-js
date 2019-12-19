let MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

let mod = {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use:  [
                MiniCssExtractPlugin.loader,
                { 
                    loader: 'css-loader',
                    options: { url: false } 
                },
                {  
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
    ]
}

let plug = [
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
      }),
]


module.exports = {
    output: {
        filename: '[name].js',
        path: __dirname + '/static/js/'
    },
    entry: {
        /*
        anatomica: [
            './src/js/anatomica.js',
            './src/sass/anatomica.scss',
        ],*/
        all: [
            './src/js/index.js',
            './src/sass/index.scss',
        ]

    },
    module: mod,
    plugins: plug
}