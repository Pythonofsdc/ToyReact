const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './main.js',
	mode: 'development',
	optimization: {
		minimize: false
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [ [ '@babel/plugin-transform-react-jsx', { pragma: 'ToyReact.createElement' } ] ]
					}
				}
			}
		]
	},
	plugins: [ new HtmlWebpackPlugin({ template: './index.html' }) ],
	devServer: {
		port: 8055
	}
};
