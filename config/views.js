/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a secure and effective way to get your app up
 * and running. Views are normally served from actions.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For details on available options for configuring server-side views, check out:
 * https://sailsjs.com/config/views
 *
 * For more background information on views and partials in Sails, check out:
 * https://sailsjs.com/docs/concepts/views
 */

module.exports.views = {

  /***************************************************************************
  *                                                                          *
  * Extension to use for your views. When calling `res.view()` in an action, *
  * you can leave this extension off. For example, calling                   *
  * `res.view('homepage')` will (using default settings) look for a          *
  * `views/homepage.ejs` file.                                               *
  *                                                                          *
  ***************************************************************************/

   extension: 'hbs',

  /***************************************************************************
  *                                                                          *
  * The path (relative to the views directory, and without extension) to     *
  * the default layout file to use, or `false` to disable layouts entirely.  *
  *                                                                          *
  * Note that layouts only work with the built-in EJS view engine!           *
  *                                                                          *
  ***************************************************************************/

  layout: false,

  getRenderFn: () => {
    // Import `consolidate`.
    var cons = require('consolidate'),
        handlebars = require('handlebars'),
        layouts = require('handlebars-layouts'),
        handlebarsRegistrar = require('handlebars-registrar'),
        fs = require("fs"),
        path = require("path");

    // Register helpers
    handlebars.registerHelper(layouts(handlebars));
    handlebarsRegistrar(handlebars, {
      helpers: path.resolve(__dirname, '../views/helpers') + '/*-helper.js',
      bustCache: true,
    });

    // Register partials
    var layoutsDir = path.resolve(__dirname, '../views/layouts'),
        partialsDir = path.resolve(__dirname, '../views/partials'),
        partials = {};
    readDirSync(path.join(layoutsDir));
    readDirSync(path.join(partialsDir));

    function readDirSync(dir){
      var pa = fs.readdirSync(dir);
      pa.forEach(function(ele,index){
        var info = fs.statSync(dir+"/"+ele)
        if(info.isDirectory()){
          readDirSync(dir+"/"+ele);
        }else{
          if (path.extname(ele) === '.hbs') {
            if (ele.indexOf('layout') >= 0) {
              partials[path.basename(ele, '.hbs')] = fs.readFileSync(dir+"/"+ele, 'utf8');
            } else {
              var relpath = path.relative(partialsDir, dir);
              var key = (relpath + '/' + path.basename(ele, '.hbs')).replace(/\\/g,'/')
              partials[key] = fs.readFileSync(dir+"/"+ele, 'utf8');
            }
          }
        }
      })
    }

    for (var partial in partials) {
      handlebars.registerPartial(partial, partials[partial]);
    }

    cons.requires.handlebars = handlebars;

    // Return the rendering function for Handlebars
    return cons.handlebars;
  },
};
