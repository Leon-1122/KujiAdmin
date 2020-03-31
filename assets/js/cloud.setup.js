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
  methods: {"getPagedProductList":{"verb":"GET","url":"/lottery/product","args":["searchFor","pageNum"]},"logout":{"verb":"GET","url":"/api/v1/entrance/logout","args":[]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","remember"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"updatePassword":{"verb":"PUT","url":"/api/v1/user/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/user/update-profile","args":["id","emailAddress","fullName","role"]},"deleteUser":{"verb":"DELETE","url":"/api/v1/user","args":["ids"]},"updateRole":{"verb":"PUT","url":"/api/v1/role","args":["id","code","desc","modules"]},"deleteRole":{"verb":"DELETE","url":"/api/v1/role","args":["ids"]},"addProduct":{"verb":"PUT","url":"/api/v1/product","args":["ppids"]},"deleteProduct":{"verb":"DELETE","url":"/api/v1/product","args":["ids"]},"addMachine":{"verb":"PUT","url":"/api/v1/machine","args":[]},"deleteMachine":{"verb":"DELETE","url":"/api/v1/machine","args":["ids"]},"refreshMachineStock":{"verb":"PUT","url":"/api/v1/machine/refresh-machine-stock","args":[]},"takeOutProduct":{"verb":"POST","url":"/api/v1/machine/take-out-product","args":["machineId","items"]},"deleteMachineLottery":{"verb":"DELETE","url":"/api/v1/machine/lottery","args":["ids"]},"addMachineLottery":{"verb":"PUT","url":"/api/v1/machine/lottery","args":["machineId","lotteryId"]},"activeMachineLottery":{"verb":"PUT","url":"/api/v1/machine/lottery/active","args":["ids"]},"updateLottery":{"verb":"PUT","url":"/api/v1/lottery","args":["id","name","price","cardTotal","bannerImg","topImg","productPreview","productList"]},"deleteLottery":{"verb":"DELETE","url":"/api/v1/lottery","args":["ids"]},"uploadPicture":{"verb":"POST","url":"/api/v1/lottery","args":["file","label"]},"downloadPicture":{"verb":"GET","url":"/api/v1/lottery/:id/picture","args":["id"]},"deletePicture":{"verb":"DELETE","url":"/api/v1/lottery/:id/picture","args":["id"]},"wxuserLogin":{"verb":"POST","url":"/api/v1/wx/login","args":["code"]},"getWxuser":{"verb":"GET","url":"/api/v1/wx/getUserInfo","args":["userId"]},"updateWxuser":{"verb":"PUT","url":"/api/v1/wx/updateUserInfo","args":["userInfo"]},"getMachineLottery":{"verb":"GET","url":"/api/v1/wx/getMachineLotteryList","args":["machineId"]},"getMachineLotteryDetail":{"verb":"GET","url":"/api/v1/wx/getMachineLotteryDetail","args":["machineId","lotteryId"]},"moneyBagPay":{"verb":"PUT","url":"/api/v1/wx/moneyBagPay","args":["lotteryId","num"]},"wechatPay":{"verb":"PUT","url":"/api/v1/wx/wechatPay","args":["lotteryId","num"]},"getCardRemain":{"verb":"GET","url":"/api/v1/wx/getCardRemain","args":["lotteryId"]},"getDrawResult":{"verb":"GET","url":"/api/v1/wx/getDrawResult","args":["lotteryId","count"]},"exportOrderCsv":{"verb":"GET","url":"/api/v1/sales/exportOrderCSV","args":["searchFor"]}}
  /* eslint-enable */

});
