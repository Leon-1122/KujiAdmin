module.exports = {


  friendlyName: 'Upload picture',


  description: 'Upload picture',


  files: ['file'],


  inputs: {

    file: {
      description: 'Upstream for an incoming file upload.',
      type: 'ref'
    },

    label: {
      type: 'string',
      description: 'A (very) brief description of the item.'
    },

  },


  exits: {

    success: {
      outputDescription: 'The newly created `Picture`.',
      outputExample: {}
    },

    noFileAttached: {
      description: 'No file was attached.',
      responseType: 'badRequest'
    },

    tooBig: {
      description: 'The file is too big.',
      responseType: 'badRequest'
    },

  },


  fn: async function ({file, label}) {

    var url = require('url');
    var util = require('util');
    var path = require('path');

    // Upload the image.
    var info = await sails.uploadOne(file, {
      maxBytes: 3000000
    })
    // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
    // `maxBytes` for both skipper-disk and skipper-s3.
      .intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
      .intercept((err) => new Error('The picture upload failed: ' + util.inspect(err)));

    if (!info) {
      throw 'noFileAttached';
    }

    var dirpath = path.resolve(
      process.cwd(),
      sails.config.appPath,
      sails.config.uploads.dirpath
    );

    // Create a new "picture" record.
    var newPicture = await Picture.create({
      imageUploadFd: path.join(dirpath, info.fd),
      imageUploadMime: info.type,
      imageFileName: info.filename
    }).fetch();

    var imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/lottery/' + newPicture.id + '/picture');

    // Return the newly-created picture, with its `imageSrc`
    return {
      id: newPicture.id,
      imageSrc
    };

  }


};
