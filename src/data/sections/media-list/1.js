export default {
  data: {
    elements: {
      title: 'Welcome to hour website',
      subtitle: 'Click here to edit your subtitle',
      description: 'Add your description here.'
    },
    items: [
      {
        title: 'Type your text',
        subtitle: 'Type your text',
        description: 'Type your text',
        image: {
          src: '/images/sample/5.jpg'
        }
      },
      {
        title: 'Type your text',
        subtitle: 'Type your text',

        description: 'Type your text',
        image: {
          src: '/images/sample/4.jpg'
        }
      },
      {
        title: 'Type your text',
        subtitle: 'Type your text',
        description: 'Type your text',
        image: {
          src: '/images/sample/7.jpg'
        }
      }
    ]
  },
  setting: {
    layout: 1,
    columns: [2, 3, 4],
    column: 3,
    elements: {
      title: true,
      description: true,
      subtitle: false
    },
    layouts: {
      shadow: true,
      sectionSize: 'l',
      alignment: 'left',
      aspectRatios: ['landscape', 'portrait', 'square'],
      aspectRatio: 'landscape'
    },
    listElements: {
      image: true,
      title: true,
      subtitle: false,
      description: true
    }
  },
  background: {}
}
