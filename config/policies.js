/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  'user/*': 'has-permission',
  'role/*': 'has-permission',
  'machine/*': 'has-permission',
  'product/*': 'has-permission',
  'lottery/*': 'has-permission',

  // Allow anyone to access the follow action, even if they're not logged in.
  'entrance/*': true,
  'view-homepage-or-redirect': true,
  'lottery/download-picture': true,
  'wx/*': true,
};
