module.exports = {


  friendlyName: 'Delete picture',


  description: 'Delete picture',


  inputs: {

    id: {
      type: 'string',
    },

  },


  exits: {

    success: {
      outputDescription: 'The `Picture` has been deleted.',
    },

  },


  fn: async function (input) {
    var fs = require('fs');
    if (!input.id) {
      return;
    }

    let pictureInfo = await Picture.findOne({
        id: input.id,
      }
    );

    if (pictureInfo) {
      if (fs.existsSync(pictureInfo.imageUploadFd)) {
        fs.unlinkSync(pictureInfo.imageUploadFd);
      }
      await Picture.destroyOne({
        id: input.id,
      });
    }

  }

};
