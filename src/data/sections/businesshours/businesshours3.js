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
    layout: 3,
    elements: {
      title: true,
      subtitle: true,
      description: true,
      dividerLine: true,
      address: true,
      businessHours: true,
      phoneNumber: true
    },
    layouts: {
      alignment: 'left',
      sectionSize: 'l'
    },
    businessInformation: {
      location: ''
    }
  },
  background: {}
}
