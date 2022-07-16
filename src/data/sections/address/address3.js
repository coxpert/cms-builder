export default {
  data: {
    elements: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    }
  },
  setting: {
    layout: 3,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      phoneNumber: true,
      email: true,
      phone: true,
      address: true,
      icon: false
    },
    layouts: {
      shadow: true,
      sectionSize: 'l'
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
