const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'production', 
    entry: './src/main.js', // Adjust this to the path of your main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Adjust the path as necessary
          }),
        ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin()] : []),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/twitter-logo.png', to: 'twitter-logo.png' },
                { from: 'README.md', to: 'README.md' }, // Add this line
            ],
        }),
    ],
    module: {
          rules: [
            {
              test: /twitter-logo\.png$/,
              type: 'asset/resource',
              generator: {
                filename: '[name][ext]' // Optional: Customize output directory and filename
              }
            },
            {
                test: /\.css$/,
                use: [
                  // For production, use MiniCssExtractPlugin.loader
                  // For development, you can use 'style-loader' for inline styles
                  process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                ],
            },
            // we now load the font directly via base64 encoding in the css
            // {
            //     test: /\.(ttf|woff|woff2|eot|svg)$/,
            //     use: [
            //       {
            //         loader: 'file-loader',
            //         options: {
            //           name: '[name].[ext]',
            //           outputPath: 'fonts/',
            //           publicPath: '/fonts',
            //         },
            //       },
            //     ],
            // },           
            {
                test: /\.(png|jpe?g|svg)$/i,
                exclude: /twitter-logo\.png$/,
                include: [
                  path.resolve(__dirname, 'src/img'),
                ],
                use: [          
                  {
                    loader: 'responsive-loader',
                    options: {
                      adapter: require('responsive-loader/sharp'),
                      sizes: [800], // This sets the desired sizes. For a single size, you can just use [800].
                      name: 'img/[name]-[width].[ext]',
                      format: 'jpeg', // Specify the output format as JPEG
                      quality: 80, // Optional: Set the quality of the output JPEG
                    },
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 75,
                      },
                      optipng: {
                        enabled: true,
                      },
                      pngquant: {
                        quality: [0.50, 0.70],
                        speed: 4,
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      webp: {
                        quality: 65,
                      },
                    },
                  },
                ],
            },
            
        ],
    },
    // If you're using webpack-dev-server, you can include its configuration here
    // devServer: {
    //     static: './',
    // },
};