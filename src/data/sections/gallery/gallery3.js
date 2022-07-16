export default {
  data: {
    items: [
      {
        src: '/images/sample/1.jpg'
      },
      {
        src: '/images/sample/2.jpg'
      },
      {
        src: '/images/sample/3.jpg'
      },
      {
        src: '/images/sample/4.jpg'
      },
      {
        src: '/images/sample/5.jpg'
      }
    ],
    elements: {
      title: 'Gallery',
      subtitle: 'Our latest and best photos',
      description: 'We love to take pictures and show them to the world'
    }
  },
  setting: {
    layout: 3,
    elements: {
      title: true,
      subtitle: true,
      description: true
    },
    layouts: {
      fullWidth: false,
      sectionSize: 'M',
      shadow: true,
      contentAlignment: 'left',
      shape: 'square',
      spacing: true
    }
  },
  background: {}
}
