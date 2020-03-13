/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"logout":{"verb":"GET","url":"/api/v1/entrance/logout","args":[]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","remember"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"updatePassword":{"verb":"PUT","url":"/api/v1/user/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/user/update-profile","args":["id","emailAddress","fullName","role"]},"deleteUser":{"verb":"DELETE","url":"/api/v1/user","args":["ids"]},"updateRole":{"verb":"PUT","url":"/api/v1/role","args":["id","code","desc","modules"]},"deleteRole":{"verb":"DELETE","url":"/api/v1/role","args":["ids"]},"addProduct":{"verb":"PUT","url":"/api/v1/product","args":["ppids"]},"deleteProduct":{"verb":"DELETE","url":"/api/v1/product","args":["ids"]},"updateLottery":{"verb":"PUT","url":"/api/v1/lottery","args":["id"]},"deleteLottery":{"verb":"DELETE","url":"/api/v1/lottery","args":["ids"]},"uploadPicture":{"verb":"POST","url":"/api/v1/lottery","args":["file","label"]},"downloadPicture":{"verb":"GET","url":"/api/v1/lottery/:id/picture","args":["id"]},"deletePicture":{"verb":"DELETE","url":"/api/v1/lottery/:id/picture","args":["id"]}}
  /* eslint-enable */

});
