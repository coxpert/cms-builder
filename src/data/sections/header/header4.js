export default {
  data: {
    elements: {
      siteTitle: '',
      login: {
        title: 'Login',
        link: {
          type: 'page',
          page: 'login'
        }
      },
      register: {
        title: 'Register',
        link: {
          type: 'page',
          page: 'register'
        }
      }
    }
  },
  setting: {
    layout: 4,
    elements: {
      siteTitle: true,
      loginButton: true,
      registerButton: true
    },
    header: {
      fixedNavigationBar: true,
      scaleTextToWidth: true
    }
  },
  background: {}
}
