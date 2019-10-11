import AuthService from './components/AuthService';
const Auth = new AuthService();

var item =[];
if(Auth.getProfile().role_name === "Admin"){
  item = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
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
      name: 'Employers',
      url: '/employee',
      icon: 'icon-user',
    },  
    {
      name: 'Students',
      url: '/student',
      icon: 'icon-user',
    },
    {
      name: 'General Settings',
      
      icon: 'icon-book-open',
      children: [
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
          name: 'Pending Enrollment',
          url: '/enrollment',
          icon: 'icon-user',
        },
        {
          name: 'Questions',
          
          icon: 'icon-book-open',
          children: [
            {
              name: 'MCQ',
              url: 'questions',
              icon: 'icon-book-open',
            },
            {
              name: 'Written Questions',
              url: '/written-questions',
              icon: 'icon-book-open',
            },
          ],
        },
        {
          name: 'Reports',
          
          icon: 'icon-book-open',
          children: [
            {
              name: 'Student Report',
              url: '/report/student',
              icon: 'icon-book-open',
            },
            {
              name: 'Employer Report',
              url: '/report/employer',
              icon: 'icon-book-open',
            },
          ],
        },
        {
          name: 'Setting',
          url: '/setting',
          icon: 'icon-settings',
        },
        {
          name: 'Specializations',
          url: '/specialization',
          icon: 'icon-tag',
        },
        {
          name: 'Universities',
          url: '/university',
          icon: 'icon-home',
        }
      ],
    },
    
    
  ]
}else if(Auth.getProfile().role_name === "Student"){
  item = [
    {
      name: 'Profile',
      url: '/Profile',
      icon: 'icon-user',
    },
    {
      name: 'Dashboard',
      url: '/Student/Dashboard',
      icon: 'icon-user',
    },
    {
      name: 'Opportunities',
      url: '/opportunities',
      icon: 'icon-star',
    }
    
  ]
}else if(Auth.getProfile().role_name === "Employer"){
  item = [
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-user',
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },{
      name: 'Vacancies',
      url: '/vacancy',
      icon: 'icon-star',
    }
   
  ]
}


export default {
  items: item,
};
