import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));

const University = React.lazy(() => import('./views/University'));
const UniversityAdd = React.lazy(() => import('./views/University/add'));
const UniversityEdit = React.lazy(() => import('./views/University/edit'));
const UniversityView = React.lazy(() => import('./views/University/view'));

const College = React.lazy(() => import('./views/College'));
const CollegeAdd = React.lazy(() => import('./views/College/add'));
const CollegeEdit = React.lazy(() => import('./views/College/edit'));
const CollegeView = React.lazy(() => import('./views/College/view'));

const Specialization = React.lazy(() => import('./views/Specialization'));
const SpecializationAdd = React.lazy(() => import('./views/Specialization/add'));
const SpecializationEdit = React.lazy(() => import('./views/Specialization/edit'));
const SpecializationView = React.lazy(() => import('./views/Specialization/view'));

const Course = React.lazy(() => import('./views/Course'));
const CourseAdd = React.lazy(() => import('./views/Course/add'));
const CourseEdit = React.lazy(() => import('./views/Course/edit'));
const CourseView = React.lazy(() => import('./views/Course/view'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/university', exact: true, name: 'University', component: University },
  { path: '/university/add', exact: true, name: 'UniversityAdd', component: UniversityAdd },
  { path: '/university/edit/:id', exact: true, name: 'UniversityEdit', component: UniversityEdit },
  { path: '/university/view/:id', exact: true, name: 'UniversityView', component: UniversityView },

  { path: '/college', exact: true, name: 'College', component: College },
  { path: '/college/add', exact: true, name: 'CollegeAdd', component: CollegeAdd },
  { path: '/college/edit/:id', exact: true, name: 'CollegeEdit', component: CollegeEdit },
  { path: '/college/view/:id', exact: true, name: 'CollegeView', component: CollegeView },
  

  { path: '/specialization', exact: true, name: 'Specialization', component: Specialization },
  { path: '/specialization/add', exact: true, name: 'SpecializationAdd', component: SpecializationAdd },
  { path: '/specialization/edit/:id', exact: true, name: 'SpecializationEdit', component: SpecializationEdit },
  { path: '/specialization/view/:id', exact: true, name: 'SpecializationView', component: SpecializationView },
  { path: '/course', exact: true, name: 'Course', component: Course },
  { path: '/course/add', exact: true, name: 'CourseAdd', component: CourseAdd },
  { path: '/course/edit/:id', exact: true, name: 'CourseEdit', component: CourseEdit },
  { path: '/course/view/:id', exact: true, name: 'CourseView', component: CourseView },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
];

export default routes;
