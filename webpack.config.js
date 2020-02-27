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
        filename: 'css/bundle.css',
      }),
]


module.exports = {
    output: {
        filename: 'js/bundle.js',
        path: '/home/eugen/projects/Django-Lessons.py/lessons/static/lessons/'
    },
    entry: {
        bundle: [
            './src/js/index.js',
            './src/sass/index.scss',
        ]
    },
    module: mod,
    plugins: plug
}