var pkg = require( "./package.json" );
var _ = require( "lodash" );
var webpack = require( "webpack" );
var banner = [
	" * <%= pkg.name %> - <%= pkg.description %>",
	" * Author: <%= pkg.author %>",
	" * Version: v<%= pkg.version %>",
	" * Url: <%= pkg.homepage %>",
	" * License(s): <%= pkg.license %>"
].join( "\n" );
var header = _.template( banner )( { pkg: pkg } );

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		library: "postalXframe",
		libraryTarget: "umd",
		filename: "postal.xframe.js"
	},
	devtool: "#inline-source-map",
	externals: [
		{
			postal: true,
			lodash: {
				root: "_",
				commonjs: "lodash",
				commonjs2: "lodash",
				amd: "lodash"
			}
		}
	],
	devtool: false,
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ "@babel/preset-env" ],
						plugins: [ "@babel/plugin-transform-runtime" ]
					}
				}
			}
		]
	},
	plugins: [ new webpack.BannerPlugin( header ) ]
};
