module.exports = {
    context: __dirname + '/src/',
    entry: './main.ts',
    output: {
        path: __dirname + '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    watch: true,
    watchOptions: {
        ignored: "**/*.js"
    }
};
