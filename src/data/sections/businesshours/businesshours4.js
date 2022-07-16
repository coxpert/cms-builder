export default {
  data: {
    elements: {
      title: 'Business Hours',
      subtitle: 'Come visit us',
      description:
        'You can edit text on your website by clicking on a text box on your website. If you have any questions, please visit our support Center where we have lots of helpful articles that will assist you in creating the website of your dreams!',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      image: {
        src: '/images/sample/7.jpg'
      }
    }
  },
  setting: {
    layout: 4,
    alignment: 'left',
    elements: {
      image: true,
      title: true,
      subtitle: true,
      businessHours: true,
      description: true
    },
    layouts: {
      sectionSize: 'l'
    },
    businessInformation: {
      location: ''
    }
  },
  background: {}
}
