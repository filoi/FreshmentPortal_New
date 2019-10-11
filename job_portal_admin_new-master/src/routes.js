import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
import AuthService from './components/AuthService';
const Auth = new AuthService();

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));

const University = React.lazy(() => import('./views/University'));
const UniversityAdd = React.lazy(() => import('./views/University/add'));
const UniversityEdit = React.lazy(() => import('./views/University/edit'));
const UniversityView = React.lazy(() => import('./views/University/view'));

const PendingEnrollment = React.lazy(() => import('./views/PendingEnrollment'));
const PendingEnrollmentAdd = React.lazy(() => import('./views/PendingEnrollment/add'));
const PendingEnrollmentEdit = React.lazy(() => import('./views/PendingEnrollment/edit'));
const PendingEnrollmentView = React.lazy(() => import('./views/PendingEnrollment/view'));

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

const Employee = React.lazy(() => import('./views/Employee'));
const EmployeeAdd = React.lazy(() => import('./views/Employee/add'));
const EmployeeEdit = React.lazy(() => import('./views/Employee/edit'));
const EmployeeView = React.lazy(() => import('./views/Employee/view'));

const RandomQuestions = React.lazy(() => import('./views/RandomQuestions'));
const RandomQuestionsAdd = React.lazy(() => import('./views/RandomQuestions/add'));
const RandomQuestionsEdit = React.lazy(() => import('./views/RandomQuestions/edit'));
const RandomQuestionsView = React.lazy(() => import('./views/RandomQuestions/view'));

const Questions = React.lazy(() => import('./views/Question'));
const QuestionsAdd = React.lazy(() => import('./views/Question/add'));
const QuestionsEdit = React.lazy(() => import('./views/Question/edit'));
const QuestionsView = React.lazy(() => import('./views/Question/view'));

const Setting = React.lazy(() => import('./views/Setting'));
const SettingEdit = React.lazy(() => import('./views/Setting/edit'));

const Student = React.lazy(() => import('./views/Student'));
const PendingStudent = React.lazy(() => import('./views/Student/pending_student'));
const employer_Student = React.lazy(() => import('./views/Student/employer_index'));
const StudentAdd = React.lazy(() => import('./views/Student/add'));
const StudentEdit = React.lazy(() => import('./views/Student/edit'));
const StudentView = React.lazy(() => import('./views/Student/view'));
const employer_StudentView = React.lazy(() => import('./views/Student/employer_view'));
const employer_ProfileView = React.lazy(() => import('./views/Profile/employer_view'));

const Profile = React.lazy(() => import('./views/Profile/view'));
const Cv = React.lazy(() => import('./views/Profile/cv'));

const Vacancy = React.lazy(() => import('./views/Vacancy'));
const VacancyAdd = React.lazy(() => import('./views/Vacancy/add'));
const VacancyEdit = React.lazy(() => import('./views/Vacancy/edit'));
const VacancyView = React.lazy(() => import('./views/Vacancy/view'));
const EmployerStudent = React.lazy(() => import('./views/Vacancy/student_profile'));

const StudentDashboard = React.lazy(() => import('./views/StudentDashbord'));
const StudentOpportunities = React.lazy(() => import('./views/StudentDashbord/Opportunities'));
const StudentVacancies = React.lazy(() => import('./views/StudentDashbord/Student_Vacancy'));
const StudentViewVacancies = React.lazy(() => import('./views/StudentDashbord/Student_View_Vacancy'));

const EmployerNotifications = React.lazy(() => import('./views/EmployerNotifications'));

const StudentReport = React.lazy(() => import('./views/StudentReport/'));
const EmployerReport = React.lazy(() => import('./views/EmployerReport/'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
var dublicate = [];

if(Auth.getProfile().role_name === "Admin"){
  dublicate = [
    { path: '/', exact: true, name: 'Home', component: DefaultLayout },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
    { path: '/university', exact: true, name: 'University', component: University },
    { path: '/university/add', exact: true, name: 'UniversityAdd', component: UniversityAdd },
    { path: '/university/edit/:id', exact: true, name: 'UniversityEdit', component: UniversityEdit },
    { path: '/university/view/:id', exact: true, name: 'UniversityView', component: UniversityView },

    { path: '/enrollment', exact: true, name: 'PendingEnrollment', component: PendingEnrollment },
    { path: '/enrollment/add', exact: true, name: 'PendingEnrollmentAdd', component: PendingEnrollmentAdd },
    { path: '/enrollment/edit/:id', exact: true, name: 'PendingEnrollmentEdit', component: PendingEnrollmentEdit },
    { path: '/enrollment/view/:id', exact: true, name: 'PendingEnrollmentView', component: PendingEnrollmentView },
  
    
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

    { path: '/questions', exact: true, name: 'RandomQuestions', component: RandomQuestions },
    { path: '/questions/add', exact: true, name: 'RandomQuestionsAdd', component: RandomQuestionsAdd },
    { path: '/questions/edit/:id', exact: true, name: 'RandomQuestionsEdit', component: RandomQuestionsEdit },
    { path: '/questions/view/:id', exact: true, name: 'RandomQuestionsView', component: RandomQuestionsView },

    { path: '/setting', exact: true, name: 'Setting', component: Setting },
    { path: '/setting/edit/:id', exact: true, name: 'SettingEdit', component: SettingEdit },
 
    { path: '/written-questions', exact: true, name: 'Questions', component: Questions },
    { path: '/written-questions/add', exact: true, name: 'QuestionsAdd', component: QuestionsAdd },
    { path: '/written-questions/edit/:id', exact: true, name: 'QuestionsEdit', component: QuestionsEdit },
    { path: '/written-questions/view/:id', exact: true, name: 'QuestionsView', component: QuestionsView },
 
    
    { path: '/employee', exact: true, name: 'Employee', component: Employee },
    { path: '/employee/add', exact: true, name: 'EmployeeAdd', component: EmployeeAdd },
    { path: '/employee/edit/:id', exact: true, name: 'EmployeeEdit', component: EmployeeEdit },
    { path: '/employee/view/:id', exact: true, name: 'EmployeeView', component: EmployeeView },
  
    { path: '/student', exact: true, name: 'Student', component: Student },
    { path: '/student/pending', exact: true, name: 'pendingStudent', component: PendingStudent },
    { path: '/student/add', exact: true, name: 'StudentAdd', component: StudentAdd },
    { path: '/student/edit/:id', exact: true, name: 'StudentEdit', component: StudentEdit },
    { path: '/student/view/:id', exact: true, name: 'StudentView', component: StudentView },
    
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
  
    { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
    { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
    { path: '/icons/flags', name: 'Flags', component: Flags },
    { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
    { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },

    { path: '/report/student', exact: true, name: 'StudentReport', component: StudentReport },
    { path: '/report/employer', exact: true, name: 'EmployerReport', component: EmployerReport },
  ];

  }else if(Auth.getProfile().role_name === "employee"){
    dublicate =[];
  }else if(Auth.getProfile().role_name === "Student"){    
    dublicate =[
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/cv', exact: true, name: 'Cv', component: Cv },
    { path: '/Student/Dashboard', exact: true, name: 'Dashboard', component: StudentDashboard },
    { path: '/opportunities', exact: true, name: 'StudentOpportunities', component: StudentVacancies },
    { path: '/Student/Vacancies', exact: true, name: 'SthudentVacancies', component: StudentVacancies },
    { path: '/Student/Vacancies/View/:id', exact: true, name: 'SthudentViewVacancies', component: StudentViewVacancies },
    ];
  }else if(Auth.getProfile().role_name === "Employer"){    
    dublicate =[
    { path: '/profile', exact: true, name: 'Profile', component: employer_ProfileView },
    { path: '/employer/student', exact: true, name: 'Student', component: employer_Student },
    { path: '/employer/student/view/:id', exact: true, name: 'Student', component: employer_StudentView },
    { path: '/employer/student/:id', exact: true, name: 'Student', component: EmployerStudent },
    
    { path: '/vacancy', exact: true, name: 'Vacancy', component: Vacancy },
    { path: '/vacancy/add', exact: true, name: 'VacancyAdd', component: VacancyAdd },
    { path: '/vacancy/edit/:id', exact: true, name: 'VacancyEdit', component: VacancyEdit },
    { path: '/vacancy/view/:id', exact: true, name: 'VacancyView', component: VacancyView },
    { path: '/dashboard', exact: true, name: 'EmployerNotifications', component: EmployerNotifications },
    ];
  }
  
const routes = dublicate;

export default routes;
