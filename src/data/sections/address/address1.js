export default {
  data: {
    elements: {
      title: 'Click here to edit your title',
      subtitle: 'Click here to edit your subtitle',
      description: 'Click here to edit your description',
      address: 'Address',
      phone: 'Phone',
      email: 'Email'
    }
  },
  setting: {
    layout: 1,
    alignments: ['left', 'right'],
    alignment: 'left',
    elements: {
      title: true,
      subtitle: true,
      description: true,
      phoneNumber: true,
      email: true,
      dividerLine: true,
      phone: true,
      businessHours: true,
      address: true
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
