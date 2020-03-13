module.exports = {


  friendlyName: 'Download picture',


  description: 'Download a picture',


  inputs: {

    id: {
      description: 'The id of the picture we\'re downloading.',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      outputDescription: 'The streaming bytes of the specified thing\'s picture.',
      outputType: 'ref'
    },

    forbidden: {responseType: 'forbidden'},

    notFound: {responseType: 'notFound'}

  },


  fn: async function ({id}) {

    var picture = await Picture.findOne({id});
    if (!picture) {
      throw 'notFound';
    }

    this.res.type(picture.imageUploadMime);

    var downloading = await sails.startDownload(picture.imageUploadFd);

    return downloading;

  }


};
