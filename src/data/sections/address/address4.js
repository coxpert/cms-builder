export default {
  data: {
    elements: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    }
  },
  setting: {
    layout: 4,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      phoneNumber: true,
      email: true,
      phone: true,
      address: true,
      icon: false
    },
    map: {
      zoomLevel: 15,
      type: 'roadmap',
      location: {
        lat: 47.751076,
        lng: -120.740135
      }
    },
    businessInformation: {
      location: ''
    }
  },
  background: {}
}
