module.exports = {
	module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader'
		    }
        ]
    }
};
