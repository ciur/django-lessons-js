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
        {
          test: /\.ts$/,
          use: [{
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                declaration: false,
                target: 'es5',
                module: 'commonjs'
              },
              transpileOnly: true
            }
          }]
        }, 
        {
          test: /\.svg$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }]
        }
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
        bundle: [
            './src/js/index.js',
            './src/sass/index.scss',
        ]
    },
    module: mod,
    plugins: plug
}