/**
 * tasks/pipeline.js
 *
 * The order in which your CSS, JavaScript, and client-side template files
 * injected as <script> or <link> tags.
 *
 * > If you are not relying on automatic asset linking, then you can safely ignore this file.
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/tasks/pipeline.js
 */



//  ██████╗ ██╗      █████╗ ██╗███╗   ██╗        ██████╗███████╗███████╗
//  ██╔══██╗██║     ██╔══██╗██║████╗  ██║       ██╔════╝██╔════╝██╔════╝
//  ██████╔╝██║     ███████║██║██╔██╗ ██║       ██║     ███████╗███████╗
//  ██╔═══╝ ██║     ██╔══██║██║██║╚██╗██║       ██║     ╚════██║╚════██║
//  ██║     ███████╗██║  ██║██║██║ ╚████║    ██╗╚██████╗███████║███████║
//  ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝    ╚═╝ ╚═════╝╚══════╝╚══════╝
//
//  ███████╗██╗██╗     ███████╗███████╗
//  ██╔════╝██║██║     ██╔════╝██╔════╝
//  █████╗  ██║██║     █████╗  ███████╗
//  ██╔══╝  ██║██║     ██╔══╝  ╚════██║
//  ██║     ██║███████╗███████╗███████║
//  ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
//
// CSS files to inject as <link> tags, in order.
//
// > Note: if you're using built-in LESS support with default settings,
// > you'll want to change `assets/styles/importer.less` instead.
//
var cssFilesToInject = [

  // Bring in `.css` files for themes and style guides (e.g. Bootstrap, Foundation)
  // 'dependencies/**/*.css',
  'dependencies/animate.css/animate.css',
  'dependencies/font-awesome/css/font-awesome.css',
  'dependencies/jqvmap/dist/jqvmap.css',
  'dependencies/metismenu/dist/metisMenu.css',
  'dependencies/nprogress/nprogress.css',
  'dependencies/dropzone/dist/dropzone.css',
  'dependencies/quill/dist/quill.core.css',
  'dependencies/quill/dist/quill.snow.css',
  'dependencies/morris.js/morris.css',
  'dependencies/bootstrap/dist/css/bootstrap.css',
  'dependencies/baguettebox.js/dist/baguetteBox.css',
  // All of the rest of your custom `.css` files will be injected here,
  // in no particular order.  To customize the ordering, add additional
  // items here, _above_ this one.
  'styles/**/*.css'
];


//   ██████╗██╗     ██╗███████╗███╗   ██╗████████╗   ███████╗██╗██████╗ ███████╗
//  ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝   ██╔════╝██║██╔══██╗██╔════╝
//  ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║█████╗███████╗██║██║  ██║█████╗
//  ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║╚════╝╚════██║██║██║  ██║██╔══╝
//  ╚██████╗███████╗██║███████╗██║ ╚████║   ██║      ███████║██║██████╔╝███████╗
//   ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝      ╚══════╝╚═╝╚═════╝ ╚══════╝
//
//          ██╗███████╗    ███████╗██╗██╗     ███████╗███████╗
//          ██║██╔════╝    ██╔════╝██║██║     ██╔════╝██╔════╝
//          ██║███████╗    █████╗  ██║██║     █████╗  ███████╗
//     ██   ██║╚════██║    ██╔══╝  ██║██║     ██╔══╝  ╚════██║
//  ██╗╚█████╔╝███████║    ██║     ██║███████╗███████╗███████║
//  ╚═╝ ╚════╝ ╚══════╝    ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
//
// Client-side javascript files to inject as <script> tags, in order.
//
var jsFilesToInject = [

  // Load `sails.io` before everything else.
  'dependencies/sails.io.js',
  'dependencies/lodash.js',

  // Bring in `.js` files for any other client-side JavaScript dependencies.
  // (e.g. Lodash, Vue.js, jQuery, Bootstrap, Ember, Angular, etc.)
  // > Be sure to list dependencies that depend on each other in the right order!
  // 'dependencies/**/*.js',
  'dependencies/jquery/dist/jquery.js',
  'dependencies/jquery-flot/jquery.flot.js',
  'dependencies/jquery-flot/jquery.flot.resize.js',
  'dependencies/jquery-flot/jquery.flot.pie.js',
  'dependencies/jquery-flot/jquery.flot.time.js',
  'dependencies/jquery.flot.tooltip/js/jquery.flot.tooltip.js',
  'dependencies/jquery-validation/dist/jquery.validate.js',
  'dependencies/jquery-sparkline/jquery.sparkline.js',
  'dependencies/jqvmap/dist/jquery.vmap.js',
  'dependencies/jqvmap/dist/maps/jquery.vmap.world.js',
  'dependencies/metismenu/dist/metisMenu.js',
  'dependencies/nprogress/nprogress.js',
  'dependencies/quill/dist/quill.js',
  'dependencies/responsive-toolkit/dist/bootstrap-toolkit.js',
  'dependencies/sortablejs/Sortable.js',
  'dependencies/tether/dist/js/tether.js',
  'dependencies/tinycolor2/tinycolor.js',
  'dependencies/dropzone/dist/dropzone.js',
  'dependencies/jquery-touchswipe/jquery.touchSwipe.js',
  'dependencies/jquery.browser/dist/jquery.browser.js',
  'dependencies/popper.js/dist/umd/popper.js',
  'dependencies/bootstrap/dist/js/bootstrap.js',
  'dependencies/raphael/raphael.js',
  'dependencies/morris.js/morris.js',
  'dependencies/baguettebox.js/dist/baguetteBox.js',
  'dependencies/cloud.js',

  // First amongst the app-level files, bring in cloud configuration
  'js/cloud.setup.js',

  // All of the rest of your custom client-side js files will be injected here,
  // in no particular order.  To customize the ordering, add additional items
  // here, _above_ this one.
  'js/config.js',
  'js/**/!(_context|config|main)*.js',
  'js/main.js',
];


//   ██████╗██╗     ██╗███████╗███╗   ██╗████████╗   ███████╗██╗██████╗ ███████╗
//  ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝   ██╔════╝██║██╔══██╗██╔════╝
//  ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║█████╗███████╗██║██║  ██║█████╗
//  ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║╚════╝╚════██║██║██║  ██║██╔══╝
//  ╚██████╗███████╗██║███████╗██║ ╚████║   ██║      ███████║██║██████╔╝███████╗
//   ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝      ╚══════╝╚═╝╚═════╝ ╚══════╝
//
//  ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗███████╗
//  ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔════╝
//     ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  ███████╗
//     ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ╚════██║
//     ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗███████║
//     ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
//
// Client-side HTML templates to precompile and inject as a single <script> tag.
// (The ordering of this array shouldn't matter.)
//
// > By default, Sails uses JST (~=lodash/underscore) templates and precompiles
// > them into functions for you.  If you want to use handlebars, pug, dust, etc.,
// > with the asset linker, no problem-- you'll just want to make sure the precompiled
// > templates get spit out to the same file.  For information on customizing and
// > installing your own Grunt tasks or using a different build pipeline, be sure
// > to check out:
// >   https://sailsjs.com/docs/concepts/assets/task-automation
//
var templateFilesToInject = [
  'templates/**/*.html'
];



//  ███╗   ███╗██╗███████╗ ██████╗       ███████╗███████╗████████╗██╗   ██╗██████╗
//  ████╗ ████║██║██╔════╝██╔════╝       ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
//  ██╔████╔██║██║███████╗██║            ███████╗█████╗     ██║   ██║   ██║██████╔╝
//  ██║╚██╔╝██║██║╚════██║██║            ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝
//  ██║ ╚═╝ ██║██║███████║╚██████╗██╗    ███████║███████╗   ██║   ╚██████╔╝██║
//  ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝╚═╝    ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝
//
// The following code exists to parse the arrays of glob expressions above, and
// then expose them via `module.exports`.  **You should not need to change any of
// the code below, unless you are modifying the default asset pipeline.**

// Default path for public folder (see documentation on sailsjs.com for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map((cssPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!' + tmpPath, cssPath.substr(1));
  }
  return require('path').join(tmpPath, cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map((jsPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!' + tmpPath, jsPath.substr(1));
  }
  return require('path').join(tmpPath, jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map((tplPath)=>{
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/', tplPath);
});
