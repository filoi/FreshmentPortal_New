export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
    {
      title: true,
      name: 'Master Data',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Universities',
      url: '/university',
      icon: 'icon-home',
    },
    {
      name: 'Colleges',
      url: '/college',
      icon: 'icon-graduation',
    },
    {
      name: 'Courses',
      url: '/course',
      icon: 'icon-book-open',
    },
    {
      name: 'Specializations',
      url: '/specialization',
      icon: 'icon-tag',
    },
  ],
};
