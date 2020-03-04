const autoprefixer = require( 'autoprefixer' );
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const CleanPlugin = require( 'clean-webpack-plugin' );

module.exports = ( env, argv ) => {
	function isDevelopment() {
		return argv.mode === 'development';
	}
	const config = {
		entry: './src/blocks.js',
		output: {
			filename: 'blocks.js',
		},
		optimization: {
			minimizer: [
				new TerserPlugin( {
					sourceMap: true,
				} ),
				new OptimizeCSSAssetsPlugin( {
					cssProcessorOptions: {
						map: {
							inline: false,
							annotation: true,
						},
					},
				} ),
			],
		},
		plugins: [
			new CleanPlugin(),
			new MiniCSSExtractPlugin( {
				chunkFilename: '[id].css',
				filename: ( chunkData ) => ( chunkData.chunk.name === 'script' ? 'style.css' : '[name].css' ),
			} ),
		],
		devtool: isDevelopment() ? 'cheap-module-source-map' : 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								[
									'@babel/preset-react',
									{
										pragma: 'wp.element.createElement',
										pragmaFrag: 'wp.element.Fragment',
										development: isDevelopment(),
									},
								],
							],
						},
					},
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCSSExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: [ autoprefixer() ],
							},
						},
						'sass-loader',
					],
				},
			],
		},
		externals: {
			'@wordpress/blocks': [ 'wp', 'blocks' ],
			'@wordpress/i18n': [ 'wp', 'i18n' ],
			'@wordpress/components': [ 'wp', 'components' ],
			'@wordpress/editor': [ 'wp', 'editor' ],
			'@wordpress/block-editor': [ 'wp', 'blockEditor' ],
			'@wordpress/blob': [ 'wp', 'blob' ],
			'@wordpress/data': [ 'wp', 'data' ],
			'@wordpress/compose': [ 'wp', 'compose' ],

		},
	};
	return config;
};
