const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // https://github.com/nrwl/nx/issues/13628#issuecomment-1407416656
  config.output.scriptType = 'text/javascript'
  return config;
});
