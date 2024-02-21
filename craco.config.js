module.exports = {
    webpack: {
      configure: {
        module: {
          rules: [
            {
              test: /\.json$/,
              loader: 'json-loader',
              type: 'javascript/auto'
            }
          ]
        }
      }
    }
  };