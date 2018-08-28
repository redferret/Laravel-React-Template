
let mix = require('laravel-mix');

let AppName = 'Laravel-React-Example';
let AppRoot = 'htdocs';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
 console.log(stdout);
}

function WebpackShellPlugin(options) {
 var defaultOptions = {
   onBuildStart: [],
   onBuildEnd: []
 };

 this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
 const options = this.options;

 compiler.plugin("compilation", compilation => {
   if (options.onBuildStart.length) {
     console.log("\nExecuting pre-build scripts\n");
     options.onBuildStart.forEach(script => exec(script, puts));
   }
 });

 compiler.plugin("emit", (compilation, callback) => {
   if (options.onBuildEnd.length) {
     console.log("\nExecuting post-build scripts\n");
     options.onBuildEnd.forEach(script => exec(script, puts));
   }
   mix.copyDirectory('public', '..\\..\\'+AppRoot+'\\'+AppName+'\\');
   callback();
 });
};

module.exports = WebpackShellPlugin;

mix.webpackConfig(webpack => {
 return {
   plugins: [
     new WebpackShellPlugin({
       onBuildStart: [],
       onBuildEnd: []
     })
   ]
 };
});
