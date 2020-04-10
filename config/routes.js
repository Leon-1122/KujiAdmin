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
  'GET /dashboard/getPagedMachineSales':  { action: 'dashboard/get-paged-machine-sales' },

  'GET /account/profile':            { action: 'account/view-profile-editor' },
  'GET /account/password':           { action: 'account/view-password-editor' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },

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

  'GET /machine/list':          { action: 'machine/view-machine-list' },
  'GET /machine/list/:pageNum': { action: 'machine/view-machine-list' },
  'GET /machine/:id':           { action: 'machine/view-machine-detail' },
  'GET /machine/stock':          { action: 'machine/view-machine-stock' },
  'GET /machine/stock/:pageNum': { action: 'machine/view-machine-stock' },
  'GET /machine/lottery/add':      { action: 'machine/view-machine-lottery-add' },
  'GET /machine/lottery':          { action: 'machine/view-machine-lottery' },
  'GET /machine/lottery/:pageNum':    { action: 'machine/view-machine-lottery' },
  'GET /machine/lottery/detail/:id':      { action: 'machine/view-machine-lottery-detail' },
  'GET /machine/log':            { action: 'machine/view-machine-log' },
  'GET /machine/log/:pageNum':   { action: 'machine/view-machine-log' },
  'GET /machine/exportMachineLogCsv':     { action: 'machine/export-machine-log-csv'},

  'GET /lottery/list':          { action: 'lottery/view-lottery-list' },
  'GET /lottery/list/:pageNum': { action: 'lottery/view-lottery-list' },
  'GET /lottery/add':           { action: 'lottery/view-lottery-editor' },
  'GET /lottery/:id':           { action: 'lottery/view-lottery-editor' },
  'GET /lottery/product':       { action: 'lottery/get-paged-product-list' },

  'GET /order/list':          { action: 'sales/view-order-list' },
  'GET /order/list/:pageNum': { action: 'sales/view-order-list' },
  'GET /order/exportOrderCsv':     { action: 'sales/export-order-csv'},

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
  'PUT    /api/v1/account/update-profile':                { action: 'account/update-profile' },
  'PUT    /api/v1/account/update-password':               { action: 'account/update-password' },
  'PUT    /api/v1/user/update-user':                      { action: 'user/update-user' },
  'PUT    /api/v1/user/reset-password':                   { action: 'user/reset-password' },
  'DELETE /api/v1/user':                                  { action: 'user/delete-user' },
  'PUT    /api/v1/role':                                  { action: 'role/update-role' },
  'DELETE /api/v1/role':                                  { action: 'role/delete-role' },
  'PUT   /api/v1/product':                                { action: 'product/add-product' },
  'DELETE /api/v1/product':                               { action: 'product/delete-product' },
  'PUT   /api/v1/machine':                                { action: 'machine/add-machine' },
  'DELETE /api/v1/machine':                               { action: 'machine/delete-machine' },
  'PUT  /api/v1/machine/refresh-machine-stock':           { action: 'machine/refresh-machine-stock' },
  'POST  /api/v1/machine/take-out-product':               { action: 'machine/take-out-product' },
  'DELETE /api/v1/machine/lottery':                       { action: 'machine/delete-machine-lottery' },
  'PUT   /api/v1/machine/lottery':                        { action: 'machine/add-machine-lottery' },
  'PUT   /api/v1/machine/lottery/active':                 { action: 'machine/active-machine-lottery' },
  'PUT   /api/v1/machine/lottery/disable':                { action: 'machine/disable-machine-lottery' },
  'PUT    /api/v1/lottery':                               { action: 'lottery/update-lottery' },
  'DELETE /api/v1/lottery':                               { action: 'lottery/delete-lottery' },
  'POST  /api/v1/lottery':                                { action: 'lottery/upload-picture' },
  'GET   /api/v1/lottery/:id/picture':                    { action: 'lottery/download-picture', skipAssets: false },
  'DELETE  /api/v1/lottery/:id/picture':                  { action: 'lottery/delete-picture' },
  'POST   /api/v1/machine/lottery/edit':                  { action: 'machine/edit-machine-lottery'},
  'POST   /api/v1/wx/login':                              { action: 'wx/wxuser-login'},
  'GET   /api/v1/wx/getUserInfo':                         { action: 'wx/get-wxuser'},
  'PUT   /api/v1/wx/updateUserInfo':                      { action: 'wx/update-wxuser'},
  'GET   /api/v1/wx/getMachineLotteryList':               { action: 'wx/get-machine-lottery'},
  'GET   /api/v1/wx/getMachineLotteryDetail':             { action: 'wx/get-machine-lottery-detail'},
  'PUT   /api/v1/wx/moneyBagPay':                         { action: 'wx/money-bag-pay'},
  'PUT   /api/v1/wx/wechatPay':                           { action: 'wx/wechat-pay'},
  'GET   /api/v1/wx/getCardRemain':                       { action: 'wx/get-card-remain'},
  'GET   /api/v1/wx/getDrawResult':                       { action: 'wx/get-draw-result'},
  'GET   /api/v1/wx/getQueue':                            { action: 'wx/get-queue'},
  'PUT   /api/v1/wx/addQueue':                            { action: 'wx/add-queue'},
  'PUT   /api/v1/wx/quitQueue':                           { action: 'wx/quit-queue'},
  'PUT   /api/v1/wx/updateQueuePayStep':                  { action: 'wx/update-queue-pay-step'},
  'POST   /api/v1/wx/reserveOrderNotify':                 { action: 'wx/reserve-order-notify'},
  'PUT   /api/v1/wx/reportVisit':                         { action: 'wx/report-visit'},
  'GET  /api/v1/dashboard/getVisitHistory':               { action: 'dashboard/get-visit-history' },
  'GET  /api/v1/dashboard/getSalesHistory':               { action: 'dashboard/get-sales-history' },
  'GET  /api/v1/dashboard/getSalesBreakdown':             { action: 'dashboard/get-sales-breakdown' },
};
