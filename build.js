import webpack from 'webpack';
import webpackConfig from './webpack.production.config.js';

function webpackCompiler () {
  let bundleStart = Date.now();

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        console.log('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      }

      const jsonStats = stats.toJson();
      console.log('Webpack compile completed.', 'Bundled in ' + (Date.now() - bundleStart) + 'ms!');

      if (jsonStats.errors.length > 0) {
        console.log('Webpack compiler encountered errors.');
        console.log(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        console.log('Webpack compiler encountered warnings.');
        console.log(jsonStats.warnings.join('\n'));
      } else {
        console.log('No errors or warnings encountered.');
      }
      resolve(jsonStats);
    });
  });
}

webpackCompiler();
