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
      handlebarsWax = require('handlebars-wax'),
      path =require('path');

    // Register helpers
    handlebarsWax(handlebars)
      .helpers(require('handlebars-layouts'))
      .helpers(path.resolve(__dirname, '../views/helpers') + '/*-helper.js');

    // Register partials
    var layoutsDir = path.resolve(__dirname, '../views/layouts'),
      partialsDir = path.resolve(__dirname, '../views/partials');
    handlebarsWax(handlebars)
      .partials(path.join(layoutsDir) + '/**/*.hbs')
      .partials(path.join(partialsDir) + '/**/*.hbs');

    cons.requires.handlebars = handlebars;

    // Return the rendering function for Handlebars
    return cons.handlebars;
  },
};
