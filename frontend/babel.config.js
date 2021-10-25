module.exports = function (api) {
  api.cache(true)
  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = ['transform-class-properties', 'react-hot-loader/babel']

  return {
    presets,
    plugins,
  }
}
