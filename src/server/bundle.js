import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack.config.js';

export default function () {
  let bundleStart = null;
  const compiler = Webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  const bundler = new WebpackDevServer(compiler, {
    publicPath: '/public/js/',
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
}
