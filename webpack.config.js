const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
 
module.exports = {
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.svg$/,
        issuer: /\.js$/,
        use: [
          {
            loader: 'svg-react-loader',
	  }
        ],
      },
    ],
  },
};