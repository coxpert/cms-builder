export default {
  name: "Footer1",
  data: {
    data: {
      elements: {
        descriptionTitle: "About Us",
        description: "Add a description here",
        siteTitle: "Site title here",
        title: "Pate Title",
        subtitle: "Click here to edit your subtitle",
        addressTitle: "Address",
      },
    },
    setting: {
      layout: 2,
      elements: {
        siteTitle: true,
        subtitle: true,
        phoneNumber: true,
        email: true,
        socialIcons: true,
        description: true,
        copyrightMessage: true,
        address: true,
        pagesMenu: true,
        dividerLine: true,
        siteMap: true,
      },
      businessInformation: {
        location: "",
      },
    },
    background: {
      type: "color",
    },
  },
};
