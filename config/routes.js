/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome':            { action: 'dashboard/view-dashboard' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },
  'GET /account/password':   { action: 'account/view-edit-password' },

  'GET /user/list':          { action: 'user/view-user-list' },
  'GET /user/list/:pageNum': { action: 'user/view-user-list' },
  'GET /user/add':           { action: 'user/view-user-editor' },
  'GET /user/:id':           { action: 'user/view-user-editor' },

  'GET /role/list':          { action: 'role/view-role-list' },
  'GET /role/list/:pageNum': { action: 'role/view-role-list' },
  'GET /role/add':           { action: 'role/view-role-editor' },
  'GET /role/:id':           { action: 'role/view-role-editor' },

  'GET /product/list':          { action: 'product/view-product-list' },
  'GET /product/list/:pageNum': { action: 'product/view-product-list' },
  'GET /product/add':           { action: 'product/view-product-add' },
  'GET /product/:id':           { action: 'product/view-product-detail' },

  'GET /lottery/list':          { action: 'lottery/view-lottery-list' },
  'GET /lottery/list/:pageNum': { action: 'lottery/view-lottery-list' },
  'GET /lottery/add':           { action: 'lottery/view-lottery-editor' },
  'GET /lottery/:id':           { action: 'lottery/view-lottery-editor' },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/logout':                  '/api/v1/entrance/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/entrance/logout':                              { action: 'entrance/logout' },
  'PUT    /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST   /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST   /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'PUT    /api/v1/user/update-password':                  { action: 'user/update-password' },
  'PUT    /api/v1/user/update-profile':                   { action: 'user/update-profile' },
  'DELETE /api/v1/user':                                  { action: 'user/delete-user' },
  'PUT    /api/v1/role':                                  { action: 'role/update-role' },
  'DELETE /api/v1/role':                                  { action: 'role/delete-role' },
  'PUT   /api/v1/product':                                { action: 'product/add-product' },
  'DELETE /api/v1/product':                               { action: 'product/delete-product' },
  'PUT    /api/v1/lottery':                               { action: 'lottery/update-lottery' },
  'DELETE /api/v1/lottery':                               { action: 'lottery/delete-lottery' },
  'POST  /api/v1/lottery':                                { action: 'lottery/upload-picture' },
  'GET   /api/v1/lottery/:id/picture':                    { action: 'lottery/download-picture', skipAssets: false },
  'DELETE  /api/v1/lottery/:id/picture':                  { action: 'lottery/delete-picture' },
};
