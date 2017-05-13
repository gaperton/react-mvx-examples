var webpack = require( 'webpack' );

var config = {
    entry  : {
        welcome : './src/welcome.jsx',
        form : './src/form.jsx',
        validation : './src/validation.jsx',
        collection : './src/collection.jsx',
        manytomany : './src/manytomany.jsx',
        paging : './src/paging.jsx',
        recursive : './src/recursive.jsx',
        multipage : './src/multipage/index.jsx'
    },

    output : {
        // export itself to a global var
        path       : __dirname + '/dist/js',
        publicPath : '/dist/js',
        filename   : '[name].js'
    },

    devtool : 'source-map',

    resolve : {
        modules : [ 'node_modules', 'src' ]
    },

    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test    : /\.jsx?$/,
                exclude : /(node_modules|lib)/,
                loader  : 'babel-loader'
            }
        ]
    }
};

module.exports = config;