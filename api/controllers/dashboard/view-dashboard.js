module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function () {

    var items = [
      {
        title: '12 Myths Uncovered About IT & Software',
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg',
        author: 'Meadow Katheryne',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 4958
      },
      {
        title: "50% of things doesn't really belongs to you",
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg',
        author: 'Alexander Sargssyan',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 192
      },
      {
        title: 'Vestibulum tincidunt amet laoreet mauris sit sem aliquam cras maecenas vel aliquam.',
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg',
        author: 'Angela Blaine',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 2143
      },
      {
        title: '10 tips of Object Oriented Design',
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/why_this/128.jpg',
        author: 'Marcus Ulupus',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 124
      },
      {
        title: 'Sometimes friend tells it is cold',
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/w7download/128.jpg',
        author: 'Grdon Mrdon',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 10214
      },
      {
        title: 'New ways of conceptual thinking',
        img: 'https://s3.amazonaws.com/uifaces/faces/twitter/pankogut/128.jpg',
        author: 'Tiko Charbaxo',
        category: 'Software',
        date: '21 SEP 10:45',
        sales: 3217
      }
    ];
    return {
      pagename: 'dashboard',
      items: items
    };

  }


};
