import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    Col, 
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
    FormFeedback,
    InputGroup, 
    InputGroupAddon, 
    InputGroupText,
    
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table, Divider, Tag } from 'antd';
import "antd/dist/antd.css";
import Modal from 'react-responsive-modal';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import "react-tabs/style/react-tabs.css";
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVert from '@material-ui/icons/MoreVert';
import { blue500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import IconAdd from 'material-ui/svg-icons/content/add';
import Moment from 'react-moment';
import Profile from './student_profile_popup';
import BaseApi from '../../components/BaseApi';

const Request = new RequestHandle();
  
  const history = createHistory();
  const ColoredLine = ({ color }) => (
    <hr
        style={{ 
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
  );
  
  const columns = [{
    title: 'Name',
    dataIndex: 'fname',
    key: 'fname',
  }, {
    title: 'College',
    dataIndex: 'college',
    key: 'college',
  }, {
    title: 'Course',
    dataIndex: 'course',
    key: 'course',
  },{
    title: 'Specializations',
    dataIndex: 'specialization_major',
    key: 'specialization_major',
  },{
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }];


  const columns2 = [{
    title: 'Student',
    dataIndex: 'fname',
    key: 'fname',
    width: '100%',
   }, 
  // {
  //   title: 'College',
  //   dataIndex: 'college',
  //   key: 'college',
  // }, {
  //   title: 'Course',
  //   dataIndex: 'course',
  //   key: 'course',
  // },{
  //   title: 'Specializations',
  //   dataIndex: 'specialization_major',
  //   key: 'specialization_major',
  // },{
  //   title: 'Status',
  //   dataIndex: 'action',
  //   key: 'action',
  // },
  // {
  //   title: 'Other Info',
  //   dataIndex: 'interview',
  //   key: 'interview',
  // },{
  //   title: 'Action',
  //   dataIndex: 'status_action',
  //   key: 'status_action',
  // }
];


  const base_status = [{
    label: 'Student Feedback Awaited',
    value: 1,
  },
  {
    label: 'Interview Invite Accepted',
    value: 2,
  },
  {
    label: 'Interview Invite Rejected',
    value: 3,
  },
  {
    label: 'Rejected',
    value: 4,
  },
  {
    label: 'Offer Request Pending',
    value: 5,
  },
  {
    label: 'Offer Request Rejected',
    value: 6,
  },
  {
    label: 'Offer Given',
    value: 7,
  },
  {
    label: 'Offer Request Accepted',
    value: 8,
  },{
    label: 'Offer Reject',
    value: 9,
  }];

  const status = [{
    label: 'Student Feedback Awaited',
    value: 1,
  },
  // {
  //   label: 'Interview Invite Accepted',
  //   value: 2,
  // },
  // {
  //   label: 'Interview Invite Regected',
  //   value: 3,
  // },
  {
    label: 'Rejected',
    value: 4,
  },
  {
    label: 'Offer Request Pending',
    value: 5,
  },
  // {
  //   label: 'Offer Request Rejected',
  //   value: 6,
  // },
  {
    label: 'Offer Given',
    value: 7,
  },{
    label: 'Offer Reject',
    value: 9,
  }];

  


  var style = {
    cursor:'not-allowed'
  };
 

export default class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300,
          formdata:'',
          visible: false,
          alerttext:'',
          job_title:'',
          number:'',
          description:'',
          closing_date:'', 
          specialization:'',     
          status:'active', 
          universityOption:[],
          selectedOption: [],
          selectedArry:[],
          spOptions:[], 
          tabIndex: 0,
          editInterview:false,
          date_from:'',
          venue:'',
          suggestionData:[],   
          suggestionPrintData:[],
          suggestionAcceptData:[],   
          suggestionAcceptPrintData:[],
          initilSuggestionAcceptData:[],
          interviewData:[],   
          interviewPrintData:[],
          interviewAcceptData:[],   
          interviewAcceptPrintData:[],
          open: false,
          fname:'',
          lname:'',
          email:'',
          gender:'',
          course:'',
          college:'',
          desired_educational_qualification:[],     
          job_location:'',   
          job_start_date:'',     
          desired_skills:'',     
          minimum_marks_required:'',
          minimum_percentage:'',
          minimum_cgpa:'',
          minimum_grade:'',      
          studentDetails:[],
          filter_open:false ,
          searchUni:'',
          searchageFrom:'',     
          searchageTo:'',     
          searchMarks:'',     

          searchUniversity:[],
          universityFilter:[],

          searchCollege:[],
          collegeFilter:[],

          searchCourse:[],
          courseFilter:[],

          searchSpecializations:[],
          specializationsFilter:[],

          searchGender:'',
          value: { min: 18, max: 100 },

          graduated_year:'',
          min_overall_grade:'',
          min_overall_cgpa:'',
          min_overall_percentage:'',

          openStatusModel:false,
          openStudentModel:false,
          params_id:"",
          change_status:[],
          selected_status:'',
          selected_status_student_id:'',
          search_status:'',
          intrview_location:'',
          intrview_date:'',
          openStatusInterviewModel:false,
          openStatusOfferModel:false,
          arrayKey:'',
          student:'',
          max_ctc:'',
          min_ctc:'',
          isChecked: false,  
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeSpecializations = this.changeSpecializations.bind(this);
        this.getData = this.getData.bind(this);
        this.tagSelect = this.tagSelect.bind(this);
        this.getSuggestion = this.getSuggestion.bind(this);
        this.setInviteTable = this.setInviteTable.bind(this);
        this.setAcceptTable = this.setAcceptTable.bind(this);
        this.viewStudent = this.viewStudent.bind(this);
        this.viewAcceptStudent = this.viewAcceptStudent.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.getAccepted = this.getAccepted.bind(this);
        this.actionInterview = this.actionInterview.bind(this);
        this.getInterviewAccepted = this.getInterviewAccepted.bind(this);
        this.setInterviewAcceptTable = this.setInterviewAcceptTable.bind(this);
        this.actionOffer = this.actionOffer.bind(this);
        this.filterModel = this.filterModel.bind(this);
        this.handleChangeUniversityFilter = this.handleChangeUniversityFilter.bind(this);
        this.changeUniversityFilter = this.changeUniversityFilter.bind(this);

        this.handleChangeCollegeFilter = this.handleChangeCollegeFilter.bind(this);
        this.changeCollegeFilter = this.changeCollegeFilter.bind(this);

        this.handleChangeCourseFilter = this.handleChangeCourseFilter.bind(this);
        this.changeCourseFilter = this.changeCourseFilter.bind(this);

        this.handleChangeSpecializationsFilter = this.handleChangeSpecializationsFilter.bind(this);
        this.changeSpecializationsFilter = this.changeSpecializationsFilter.bind(this);

        this.handleChangeGenderFilter = this.handleChangeGenderFilter.bind(this);
        this.filterSubmit = this.filterSubmit.bind(this);
        this.isOpenStatusPopup = this.isOpenStatusPopup.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.initialSelectedStudent = this.initialSelectedStudent.bind(this);
        this.handleChangeSearchStatus = this.handleChangeSearchStatus.bind(this);
        this.filterSelectedStudent = this.filterSelectedStudent.bind(this);
        this.SearchWithState = this.SearchWithState.bind(this);
        this.statusInterviewChange = this.statusInterviewChange.bind(this);
        this.filterButton = this.filterButton.bind(this);
        this.statusOfferChange = this.statusOfferChange.bind(this);
        
      }

      handleChangeUniversityFilter = (selectedOption) => {
        this.setState({ searchUniversity:selectedOption });
      }

      handleChangeSearchStatus = (selectedOption) => {
        this.setState({ search_status:selectedOption });
        
         }

      SearchWithState(){
        this.filterSelectedStudent(this.state.search_status);
      }

      changeUniversityFilter(inputValue){
        var that =this;
        Request.RequestHandle('university?search='+inputValue,'GET',null,function(result) {
          that.setState({universityFilter:[]});          
          var universityFilter =[];
              result.data.results.map(item => { 
                universityFilter.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({universityFilter});
          }); 
      }

      handleChangeCollegeFilter = (selectedOption) => {
        this.setState({ searchCollege:selectedOption });
      }

      changeCollegeFilter(inputValue){
        var that =this;
        Request.RequestHandle('college?search='+inputValue,'GET',null,function(result) {
      
            that.setState({collegeFilter:[]});          
            var collegeFilter =[];
                result.data.results.map(item => { 
                  collegeFilter.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
                that.setState({collegeFilter});
      
          }); 
      }

     

      handleChangeCourseFilter = (selectedOption) => {
        this.setState({ searchCourse:selectedOption });
      }

      changeCourseFilter(inputValue){
        var that =this;
        Request.RequestHandle('course?search='+inputValue,'GET',null,function(result) {
          that.setState({courseFilter:[]});          
          var courseFilter =[];
              result.data.results.map(item => { 
                courseFilter.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({courseFilter});
          }); 
      }


      handleChangeSpecializationsFilter = (selectedOption) => {
        this.setState({ searchSpecializations:selectedOption });
      }

      changeSpecializationsFilter(inputValue){
        var that =this;
        Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
        
          if(result.status){
            that.setState({specializationsFilter:[]});          
            var specializationsFilter =[];
                result.data.results.map(item => { 
                  specializationsFilter.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
                that.setState({specializationsFilter});
          }
          }); 
      }

      handleChangeGenderFilter = (selectedOption) => {
        this.setState({ searchGender:selectedOption });
      }

      handleChangeStatus = (selectedOption) => {
        this.setState({ selected_status:selectedOption });
      }

      onOpenModal = () => {
       this.setState({ open: true});
      };

      isOpenStatusPopup(){
       this.setState({ openStatusModel: true});
      }

      onFilterOpenModal = () => {
        this.setState({ filter_open: true});
       };


      onCloseModal = () => {
        this.setState({ open: false });
        this.setState({ filter_open: false});
        this.setState({ openStatusModel: false,openStudentModel:false});
        this.setState({ openStatusInterviewModel: false});
        this.setState({ openStatusOfferModel: false});

      };

      componentDidMount = () => {
        Request.RequestHandle('vacancy/'+this.props.match.params.id,'GET',null,this.getData); 
        Request.RequestHandle('employer/suggestion/'+this.props.match.params.id,'POST',null,this.getSuggestion); 
        this.initialSelectedStudent();
       
      }


      filterButton() {
      if (this.state.tabIndex ===1) {
        let that =this;
        const list =  {
                    items: [{
                        primaryText: 'Filter',
                        rightAvatar: <Avatar backgroundColor={blue500} icon={<FilterListIcon />} />,
                        onClick() {
                          that.onFilterOpenModal()
                        },
                      }]
                    };
      
        const listbutton =<BubbleList>
                          <BubbleListItem {...list.items[0]} />
                          </BubbleList>;
      
      
        const floatingActionButtonProps =
                            {
                            backgroundColor: blue500
                            };
  
          return (
              <MuiThemeProvider>
              <SpeedDial
              hasBackdrop={false}
              icon={<MoreVert />}
              floatingActionButtonProps={floatingActionButtonProps}
              className ="flotingBtn"
              onChange ={()=>{this.onFilterOpenModal()}}
              >
              {listbutton}
              </SpeedDial>
              </MuiThemeProvider>
                );
       
      }
      else{
        return "";
      }
    }

      initialSelectedStudent(){
        this.setState({search_status:''})
        Request.RequestHandle('vacancy/'+this.props.match.params.id+'/candidates','GET',null,this.getAccepted); 
      }

      filterSelectedStudent(status_id){
        //this.setState({suggestionAcceptData:[]})
     
        Request.RequestHandle('vacancy/'+this.props.match.params.id+'/candidates?status='+status_id.value,'GET',null,this.getAccepted); 
      }

      filterSubmit(){
        let searchUniversity = [];
        this.state.searchUniversity.map(item =>{
          searchUniversity.push(item.value)
        });
        let searchCollege = [];
        this.state.searchCollege.map(item =>{
          searchCollege.push(item.value)
        });
        let searchSpecializations = [];
        this.state.searchSpecializations.map(item =>{
          searchSpecializations.push(item.value)
        });
        let searchCourse = [];
        this.state.searchCourse.map(item =>{
          searchCourse.push(item.value)
        })

        var gender = "";
        if(this.state.searchGender.value !== undefined){
          gender = this.state.searchGender.value;
        }

        var searchageTo = "";
        if(this.state.value.max <= 80){
          searchageTo = this.state.value.max;
        }

        var searchageFrom = "";
        if(this.state.value.min >= 10){
          searchageTo = this.state.value.min;
        }

        var searchInterest = "";
        if (this.state.isChecked) {
          searchInterest = "active" 
        }
        
        let filter = {
          'searchUni':searchUniversity,
          'searchSpecialization':searchSpecializations,
          'searchCollege':searchCollege,
          'searchCourse':searchCourse,
          'searchGender':gender,
          'searchageFrom':searchageFrom,
          'searchageTo':searchageTo,
          'searchYear':this.state.graduated_year,
          // 'searchMarks':this.state.min_overall_grade,
          'searchGrade':this.state.min_overall_grade,
          'searchCGPA':this.state.min_overall_cgpa,
          'searchPercentage':this.state.min_overall_percentage,
          'searchInterest':searchInterest
        }

       
       
        Request.RequestHandle('employer/suggestion/'+this.props.match.params.id,'POST',JSON.stringify(filter),this.getSuggestion); 
      }

      getSuggestion(result){
       
        if(result.status){
          this.setState({suggestionData:result.data.results});
          this.setInviteTable();   
          this.onCloseModal();
        }
      }

      getAccepted(result){
      
        if(result.status){
        
           this.setState({suggestionAcceptData:result.data.results,initilSuggestionAcceptData:result.data.results});
           this.setAcceptTable();   
        }
      }

      getInterviewAccepted(result){
       
        if(result.status){
           this.setState({interviewAcceptData:result.data.results});
           this.setInterviewAcceptTable();   
        }
      }

    

      setInviteTable(){
        let suggestionPrintData =[];
        this.state.suggestionData.map((item,key) => {
          let st = item.student_doc;
          item.student_doc = [];
          item.student_doc[0] = st;
          if(item.student_doc.length ===0){
            item.student_doc[0] = '';
          }
          if(item.college_doc.length ===0){
            item.college_doc[0] = '';
          }
          if(item.course_doc.length ===0){
            item.course_doc[0] = '';
          }
          if(item.major_doc.length ===0){
            item.major_doc[0] = '';
          }
          if(item.minor_doc.length ===0){
            item.minor_doc[0] = '';
          }

          let minor ="";
          if(item.minor_doc[0].name !==undefined){
            minor = ","+item.minor_doc[0].name;
          }
          
          let name = <a  href  onClick={()=>{this.viewAcceptStudent(item._id)}}><b>{item.fname + " " + item.lname}</b></a> 
          let academic_year = "";
          if(item.academic_from !== null && item.academic_to !== null){
            if (item.academic_from !== undefined && item.academic_to !== undefined) {
              academic_year = '('+item.academic_from +'-'+item.academic_to+')'
               }
          }

          let fave ="";
          if(item.is_like >=1){
            fave = <a href className="fave1"><span className="fa fa-star star1 fave-str1"></span></a>
          }
          let student =  <div className="table-student">{name} {fave}</div>
          let interview =  "";
          let college =  <div className="table-college">{item.college_doc[0].name} </div>
          let course =  <div className="table-course">{item.course_doc[0].name} {academic_year+','} </div>
          let specialization = <div className= "specialization-div"><div className="table-specialization-title">Specialization: </div> <div className="table-specialization">{ item.major_doc[0].name+minor}</div></div>
          let overall_grade = <div className= "specialization-div"><div className="table-specialization-title">Overall Grade: </div> <div className="table-specialization">{ item.overall_grade}</div></div>
          let current_status='';
          let action_button='';
          let action =  <div className="table-action-button">
                          <span>
                          <a className="status_tags red" href onClick={()=>{this.actionInvite(key,"1",item._id)}} >Invite</a>
                          <a className="status_tags green" href  onClick={()=>{this.actionInvite(key,"0",item._id)}}>Delete</a>
                          </span>
                          </div>
       
          let content = <div className ="table-conts"> {interview} {student} {course} {college} {specialization} {overall_grade}  {current_status} {action}</div>
         
         
          suggestionPrintData.push({
            key:key,
            fname:content,
          })
        }); 
        this.setState({suggestionPrintData});
      }

      setAcceptTable(){
        let suggestionAcceptPrintData =[];
        this.state.suggestionAcceptData.map((item,key) => {
         
          if(item.student_doc.length ===0){
            item.student_doc[0] = '';
          }
          if(item.college_doc.length ===0){
            item.college_doc[0] = '';
          }
          if(item.course_doc.length ===0){
            item.course_doc[0] = '';
          }
          if(item.major_doc.length ===0){
            item.major_doc[0] = '';
          }
          if(item.minor_doc.length ===0){
            item.minor_doc[0] = '';
          }

          let minor ="";
          if(item.minor_doc[0].name !==undefined){
            minor = ","+item.minor_doc[0].name;
          }
          
          let name = <a  href  onClick={()=>{this.viewAcceptStudent(item.student_doc[0]._id)}}><b>{item.student_doc[0].fname + " " + item.student_doc[0].lname}</b></a> 
          let status_label = "";
         let interview_button = "";
          if( parseInt(item.status) === 2){
           interview_button = <span><a href   onClick={()=>{this.statusInterviewChange(item.student_doc[0]._id)}}>interview info</a></span>
         }
        
        // else if(parseInt(item.status) === 7){
        //   interview_button = <span><a href   onClick={()=>{this.statusOfferChange(item.student_doc[0]._id,key)}}>Offer info</a></span>
        //  }


         let academic_year = "";
         if(item.student_doc[0].academic_from !== null && item.student_doc[0].academic_to !== null){
           if (item.student_doc[0].academic_from !== undefined && item.student_doc[0].academic_to !== undefined) {
          academic_year = '('+item.student_doc[0].academic_from +'-'+item.student_doc[0].academic_to+')'
           }
         }
        
         let student =  <div className="table-student">{name}</div>
         let interview =  <div className="table-interview">{interview_button}</div>
         let college =  <div className="table-college">{item.college_doc[0].name} </div>
         let course =  <div className="table-course">{item.course_doc[0].name} {academic_year+','}</div>
         let specialization = <div className= "specialization-div"><div className="table-specialization-title">Specialization: </div> <div className="table-specialization">{ item.major_doc[0].name+minor}</div></div>
         let overall_grade = <div className= "specialization-div"><div className="table-specialization-title">Overall Grade: </div> <div className="table-specialization">{ item.student_doc[0].overall_grade}</div></div>
         let current_status='';
         let interview_info='';
         let action_button='';
         
         base_status.map((value,index) =>{
          if(value.value === parseInt(item.status)){
           status_label= value.label;
           if((item.venue !== undefined && item.venue !== null || item.venue !== "") && value.value === 2){
            status_label = "Interview in Progress";
            }

             action_button =  <div className="table-action-button">{this.statusAction(item.student_doc[0]._id,index)}</div>
             current_status = <div className= "specialization-div">
                                  <div className="table-specialization-title">Status: </div> 
                                  <div className="table-specialization">{ status_label}</div>
                              </div>
            
          }
         })

        
         let content = <div className ="table-conts"> {interview} {student} {course} {college} {specialization} {overall_grade}  {current_status} {action_button}</div>
          suggestionAcceptPrintData.push({
            key:key,
            fname:content,
          })
        }); 
        this.setState({suggestionAcceptPrintData});
    }


    statusAction(student_id,status_id){
      // this.setState({change_status:status});
       var new_status = [];
     status_id++;
   
      let action = ""
       if(status_id === 0){
        
       }else if(status_id === 1){
         //new_status.push(base_status[0]);
       }else if(status_id === 2){
         action =  <span><a className="status_tags red" href   onClick={()=>{this.statusOfferChange(student_id,base_status[4].value)}}>Selected in Interview</a><a className="status_tags green" href   onClick={()=>{this.updateStatus(student_id,base_status[3].value)}}>Rejected in Interview</a></span>
       }else if(status_id === 3){
         //new_status.push(base_status[1]);
       }else if(status_id === 4){
         //new_status.push(base_status[1]);
       }else if(status_id === 5){

      }else if(status_id === 6){

       }else if(status_id === 8){
        action =  <span>
                        <a className="status_tags red" href   onClick={()=>{this.updateStatus(student_id,base_status[6].value)}}>Placement Done</a>
                        {/* <a className="status_tags green" href   onClick={()=>{this.updateStatus(student_id,base_status[8].value)}}>Reject</a> */}
                  </span>
      }
      // action =  <span><a className="status_tags red" href   onClick={()=>{this.updateStatus(student_id,1)}}>Select</a><a className="status_tags green" href   onClick={()=>{this.updateStatus(student_id,base_status[8].value)}}>Reject</a></span>
     
        return action;
      }


    statusChange(student_id,status_id){
      var new_status = [];
    status_id++;

      if(status_id === 0){
        //new_status.push(base_status[0]);
      }else if(status_id === 1){
        //new_status.push(base_status[0]);
      }else if(status_id === 2){
        new_status.push(base_status[3]);
        new_status.push(base_status[4]);
      }else if(status_id === 3){
        //new_status.push(base_status[1]);
      }else if(status_id === 4){
        //new_status.push(base_status[1]);
      }else if(status_id === 5){
        new_status.push(base_status[6]);
      }else if(status_id === 6){
      }
   

      if(new_status.length > 0)
      {
        this.setState({change_status:new_status,selected_status_student_id:student_id});
        this.isOpenStatusPopup();
      }
      else
      {
        swal("Info!", "There is no possible status change available for you at the moment.", "info");
      }
     
    
     }

     statusInterviewChange(student){
      this.setState({openStatusInterviewModel:true,arrayKey:'',studentId:student});
     }

     submitInterview(){
      let that = this;
      var upset = {
        // status:base_status[0].value.toString(),
        // student_id:this.state.studentId,
        date:this.state.intrview_date,
        venue:this.state.intrview_location,
        // vacancy_id:this.props.match.params.id,
      }
      Request.RequestHandle('vacancy/send_interview/student/'+this.state.studentId+'/vacancy/'+this.props.match.params.id,'POST',JSON.stringify(upset),function(result) {
        if(result.status){
         swal("Success!", "Your information has been submitted.", "success");
          let suggestionData =that.state.suggestionData;
           delete suggestionData[that.state.arrayKey]; 
           that.setState({suggestionData});
           that.setInviteTable();
          that.initialSelectedStudent();
            that.onCloseModal()
        }else{
          swal("Error!", result.msg, "error");
        }
      });
     }

     statusOfferChange(student,key){
      this.setState({openStatusOfferModel:true,offer_student:student,offer_key:key});
     }

     offerUpdate(){
      
      var upset = {
        status:base_status[4].value.toString(),
        student_id:this.state.offer_student,
        ctc:this.state.annual_ctc,
        join_date:this.state.joining_date,
        location:this.state.job_location_offer,
        hr_name:this.state.hr_name,
        hr_email:this.state.hr_email,
        hr_contact_no:this.state.hr_phone,
        vacancy_id:this.props.match.params.id,
      }
      let that = this;
     Request.RequestHandle('vacancy/candidates/change_status/','POST',JSON.stringify(upset),function(result) {
       if(result.status){
        // swal("Success!", "Your information has been submitted.", "success");
        //  if(inital_status_id === 7){
        //    that.statusOfferChange(student_id);
        //  }
        
         that.onCloseModal();
         that.initialSelectedStudent();
       }else{
         swal("Error!", result.msg, "error");
       }
     }); 
     }
     
     updateStatus(student_id,inital_status_id){

      let title = "Status Confirmation";
      let text = "Are you sure that you want to change this Status?";
      let icon = "success";
     swal({
      title:title,
      text:text,
      icon:icon,
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) { 
        var upset = {
          status:inital_status_id,
          student_id:student_id,
          vacancy_id:this.props.match.params.id,
        }
        let that = this;
       Request.RequestHandle('vacancy/candidates/change_status/','POST',JSON.stringify(upset),function(result) {
         if(result.status){
          // swal("Success!", "Your information has been submitted.", "success");
          //  if(inital_status_id === 7){
          //    that.statusOfferChange(student_id);
          //  }
          
           that.initialSelectedStudent();
         }else{
           swal("Error!", result.msg, "error");
         }
       }); 
    }
    });
     }

    setInterviewAcceptTable(){
      let interviewAcceptPrintData =[];
      if(this.state.interviewAcceptData.length !==0 ){
      this.state.interviewAcceptData.map((item,key) => {
        let name = <a className="link" href  onClick={()=>{this.viewAcceptStudent(item.student_doc[0]._id)}}><b>{item.student_doc[0].fname + " " + item.student_doc[0].lname}</b></a> 
        let action =  <span><a href   onClick={()=>{this.actionOffer(key,'accept',item.student_doc[0]._id)}}>Invite</a><Divider type="vertical" /><a href  onClick={()=>{this.actionOffer(key,'reject',item.student_doc[0]._id)}}>Delete</a></span>
        interviewAcceptPrintData.push({key:key,fname:name,college:item.college_doc[0].name,course:item.course_doc[0].name,specialization_major:item.major_doc[0].name + ", " + item.minor_doc[0].name,action:action})
      }); 
      this.setState({interviewAcceptPrintData});
    }
  }
      

      actionInvite(key,action,student_id){
        let title = "Invite Confirmation";
        let text = "Are you sure that you want to invite this student?";
        let icon = "success";
        if(action ==="0"){
           title = "Delete Confirmation";
           text = "Are you sure that you want to Delete this student?";
           icon = "success";
        }
        

        swal({
          title:title,
          text:text,
          icon:icon,
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {    
            var upset = {
              status:action,
              student_id:student_id,
              vacancy_id:this.props.match.params.id,
            }
            let that = this;
           Request.RequestHandle('vacancy/candidates/change_status/','POST',JSON.stringify(upset),function(result) {
             if(result.status){
              // swal("Success!", "Your information has been submitted.", "success");
               let suggestionData =that.state.suggestionData;
                delete suggestionData[key]; 
                that.setState({suggestionData});
                that.setInviteTable();
               that.initialSelectedStudent();
             }else{
               swal("Error!", result.msg, "error");
             }
           }); 
          } else {
          }
        });
      }

      actionInterview(key,action,student_id){
      
        var actionData={
          accept:action
        };
        let that = this;
        Request.RequestHandle('employer/vacancy/'+this.props.match.params.id+'/student/'+student_id+'/interview','POST',JSON.stringify(actionData),function(result){
          if (result.status) {
           
            let suggestionAcceptData =that.state.suggestionAcceptData;
            delete suggestionAcceptData[key]; 
            that.setState({suggestionAcceptData});
            that.setAcceptTable();
          }
        }); 
      }

      actionOffer(key,action,student_id){
        var actionData={
          accept:action
        };
        let that = this;
        Request.RequestHandle('employer/vacancy/'+this.props.match.params.id+'/student/'+student_id+'/offer','POST',JSON.stringify(actionData),function(result){
          if (result.status) {
           
            let interviewAcceptData =that.state.interviewAcceptData;
            delete interviewAcceptData[key]; 
            that.setState({interviewAcceptData});
            that.setAcceptTable();
          }else{
         
          }
        }); 
      }

      viewStudent(id){
    
      let suggestionData = this.state.suggestionData[id].student_doc[0];
      let college = this.state.suggestionData[id].college_doc[0];
      let course = this.state.suggestionData[id].course_doc[0];
      if(suggestionData !== undefined){
        this.setState({
          fname:suggestionData.fname,
          lname:suggestionData.lname,
          email:suggestionData.email,
          gender:suggestionData.gender,
          course:course.name,
          college:college.name,
        });
        this.onOpenModal();
      }
      }

      viewAcceptStudent(id){
        this.setState({openStudentModel:true,params_id:id})
      //   this.props.history.push({
      //     pathname: '/employer/student/'+id,
      //  })
        }

      getData(result){
        if(result.status){
          var data = result.data.results[0];


          var spOptions =[];
          data.spec_doc.map(item => { 
            spOptions.push({
              'label':item.name,
              'value':item._id,
              });
          });
          this.setState({selectedOption:spOptions});
          this.setState({
            job_title:data.job_title,
            date_from:data.date_from,
            venue:data.venue,
            number:data.number,
            description:data.description,
            closing_date:data.closing_date,      
            status:data.status,  
            desired_educational_qualification:data.course_doc,    
            job_location:data.job_location,    
            job_start_date:data.job_start_date,    
            desired_skills:data.desired_skills,    
            minimum_marks_required:data.minimum_marks_required,    
            minimum_percentage:data.minimum_percentage,
            minimum_cgpa:data.minimum_cgpa,
            minimum_grade:data.minimum_grade,
            min_ctc:data.min_ctc,       
            max_ctc:data.max_ctc       
          });
        }
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        var selectOptions = [];
        selectedOption.map(item => { 
          selectOptions.push(item.value)
        })
        this.setState({ selectedArry:selectOptions });
      }

      changeSpecializations(inputValue){
        var that =this;
        Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
          that.setState({universityOption:[]});              
          var spOptions =[];
              result.data.results.map(item => { 
                spOptions.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({spOptions});
          }); 
      }

      handleSubmit(event) {
        const universityData ={
          date_from : this.state.date_from,
          venue:this.state.venue 
          }
          Request.RequestHandle('vacancy/'+this.props.match.params.id+'/interview','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        if(Result.status){
         // this.resetForm();
            // swal("Success!", "Your information has been submitted.", "success");
            this.setState({editInterview:false});            

        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
    tagSelect(tagSelect){
      this.setState({tabIndex:tagSelect});
      if(tagSelect === 1){
        this.setState({footerButton:false});
      }else{
        this.setState({footerButton:true});
      }
    }

    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    
    }


    filterModel(){
     return( <Modal open={this.state.filter_open} onClose={this.onCloseModal} center>
      <Row>
        <Col>
          <Card>
          <CardBody>
          {/* <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text"  id="searchName" name="searchName" value={this.state.searchName} onChange ={this.onChange} placeholder=""/>                     
                      </Col>
          </FormGroup> */}
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">University:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.searchUniversity}
                        onChange={this.handleChangeUniversityFilter}
                        onInputChange ={this.changeUniversityFilter}
                        options={this.state.universityFilter}
                        isSearchable
                        isMulti
                      />
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">College:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.searchCollege}
                        onChange={this.handleChangeCollegeFilter}
                        onInputChange ={this.changeCollegeFilter}
                        options={this.state.collegeFilter}
                        isSearchable
                        isMulti
                      />
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Course:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.searchCourse}
                        onChange={this.handleChangeCourseFilter}
                        onInputChange ={this.changeCourseFilter}
                        options={this.state.courseFilter}
                        isSearchable
                        isMulti
                      />
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specialization:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.searchSpecializations}
                        onChange={this.handleChangeSpecializationsFilter}
                        onInputChange ={this.changeSpecializationsFilter}
                        options={this.state.specializationsFilter}
                        isSearchable
                        isMulti
                      />
                      </Col>
          </FormGroup>
         
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Gender:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.searchGender}
                        onChange={this.handleChangeGenderFilter}
                        options={[{
                                  'label':'Male',
                                  'value':'male',
                                  },{
                                  'label':"Female",
                                  'value':"female",
                                  }]}
                        isSearchable
                      />
                      </Col>
          </FormGroup>
          <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Minimum Overall Grade:</Label>
              </Col>
              <Col xs="12" md="9">
              <InputGroup>
                          <InputGroupAddon addonType="prepend">Percentage</InputGroupAddon>
                          <Input placeholder="Minimum Percentage" name="min_overall_percentage" value={this.state.min_overall_percentage} onChange ={this.onChange}/>
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">CGPA</InputGroupAddon>
                          <Input placeholder="Minimum CGPA" name="min_overall_cgpa" value={this.state.min_overall_cgpa} onChange ={this.onChange}/>
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">Grade</InputGroupAddon>
                          <Input type="select" 
                            name="min_overall_grade" 
                            value={this.state.min_overall_grade}
                            onChange ={this.onChange}
                            >
                            <option></option>
                            {BaseApi.grades.map((material,index) => {
                              return <option value={material}>{material}</option>
                            })}
                          </Input>
                        </InputGroup>
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Applied Student:</Label>
              </Col>
              <Col xs="12" md="9">
              
              {' '}<Input type="checkbox" 
                  className="checkbox-margin"
                  name="graduated_year" 
                  checked={this.state.isChecked}
                  onChange={this.toggleChange}
                   />{' '}
              </Col>
          </FormGroup>
          <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Graduated Year:</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text"  id="graduated_year" name="graduated_year" value={this.state.graduated_year} onChange ={this.onChange} placeholder=""/>
              </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Age:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <InputRange
                        maxValue={100}
                        minValue={0}
                        value={this.state.value}
                        onChange={value => this.setState({ value })} />
                      </Col>
          </FormGroup>
          <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.filterSubmit();
            }}
          >
            Filter
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
        </CardBody>
          </Card>
        </Col>
      </Row>
      </Modal>)

    }

  render() {
    const {alerttext,open} = this.state;
    const { selectedOption } = this.state;

    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Vacancy
              </div>
          <Row >
          <Col>
          <Card>  
                <CardBody className="pb-0">
          {this.filterModel()}
        <Modal open={open} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  >
            <CardTitle>Student Profile</CardTitle>
          <FormGroup row>
            <Col md="2">
              <Label htmlFor="text-input">First Name:</Label>
            </Col>
            <Col xs="12" md="4">
              <p>{this.state.fname}</p>
            </Col>
            <Col md="2">
              <Label htmlFor="text-input">Last Name:</Label>
            </Col>
            <Col xs="12" md="4">
              <p>{this.state.lname}</p>
            </Col>
          </FormGroup>
          <FormGroup row>
          <Col md="2">
              <Label htmlFor="text-input">College:</Label>
            </Col>
            <Col xs="12" md="4">
            <p>{this.state.college}</p>
            </Col>
            <Col md="2">
              <Label htmlFor="text-input">Course:</Label>
            </Col>
            <Col xs="12" md="4">
            <p>{this.state.course}</p>
            </Col>
          </FormGroup>
          <FormGroup row>
          <Col md="2">
              <Label htmlFor="text-input">College:</Label>
            </Col>
            <Col xs="12" md="4">
            <p>{this.state.college}</p>
            </Col>
            <Col md="2">
              <Label htmlFor="text-input">Course:</Label>
            </Col>
            <Col xs="12" md="4">
            <p>{this.state.course}</p>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="2">
              <Label htmlFor="text-input">Email:</Label>
            </Col>
            <Col xs="12" md="4">
            <p>{this.state.email}</p>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="2">
              <Label htmlFor="text-input">Permanent Address:</Label>
            </Col>
            <Col xs="12" md="4">
            <p className="qution">{this.state.studentDetails.permanant_address},</p>
            <p className="qution">{this.state.studentDetails.p_city},</p>
            <p className="qution">{this.state.studentDetails.p_state},</p>
            <p className="qution">{this.state.studentDetails.p_pin_code}.</p>
            </Col>
            <Col md="2">
              <Label htmlFor="text-input">Current Address:</Label>
            </Col>
            <Col xs="12" md="4">
            <p className="qution">{this.state.studentDetails.current_address},</p>
            <p className="qution">{this.state.studentDetails.c_city},</p>
            <p className="qution">{this.state.studentDetails.c_state},</p>
            <p className="qution">{this.state.studentDetails.c_pin_code}.</p>
            </Col>
          </FormGroup>
         
          <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.writtenExamSave();
            }}
          >
            Invite
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>


        <Modal open={this.state.openStatusModel} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  >
            <CardTitle>Status Change</CardTitle>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.selected_status}
                        onChange={this.handleChangeStatus}
                        options={this.state.change_status}
                        isSearchable
                      />
                      </Col>
          </FormGroup>
          <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.updateStatus();
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>

        <Modal open={this.state.openStudentModel} onClose={this.onCloseModal} center>
        <Row>
          <Col>
          <Profile student={this.state.params_id} />
          </Col>
        </Row>
        </Modal>


        <Modal open={this.state.openStatusInterviewModel} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  >
            <CardTitle>Add Interview</CardTitle>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Venue:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="intrview_location" 
                      name="intrview_location" 
                      value={this.state.intrview_location} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="date" 
                      id="intrview_date" 
                      name="intrview_date" 
                      value={this.state.intrview_date} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.submitInterview();
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>

        <Modal open={this.state.openStatusOfferModel} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  >
            <CardTitle>Offer Info</CardTitle>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Annual CTC(Amount):</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="annual_ctc" 
                      name="annual_ctc" 
                      value={this.state.annual_ctc} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
            </FormGroup>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Joining Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="date" 
                      id="joining_date" 
                      name="joining_date" 
                      value={this.state.joining_date} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Locations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="job_location_offer" 
                      name="job_location_offer" 
                      value={this.state.job_location_offer} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Name of HR:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="hr_name" 
                      name="hr_name" 
                      value={this.state.hr_name} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">HR email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="hr_email" 
                      name="hr_email" 
                      value={this.state.hr_email} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">HR phone:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input 
                      type="text" 
                      id="hr_phone" 
                      name="hr_phone" 
                      value={this.state.hr_phone} 
                      onChange ={this.onChange} 
                      placeholder=""/>
                      
                      </Col>
          </FormGroup>
          <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.offerUpdate();
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>


                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tagSelect(tabIndex)}>
                  <TabList>
                    <Tab>Basic Details</Tab>
                    <Tab>Shortlisted Student</Tab>
                    <Tab>Invited Students</Tab>
                  </TabList>
                  <TabPanel>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Job Title:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.job_title}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">No. of Position:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.number}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Desired Education Qualification(s):</Label>
                      </Col>
                      <Col xs="12" md="9">
                      {this.state.desired_educational_qualification.map(ui =>{
                            return (<p>{ui.name}</p>)
                      })}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specializations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>
                      {this.state.selectedOption.map((material,index) => { 
                        return material.label+', '
                      })
                      }
                      </p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Min CTC:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.min_ctc}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Max CTC:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.max_ctc}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Start Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Moment format="D MMM YYYY" withTitle>
                      {this.state.job_start_date}
                        </Moment>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Closing Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Moment format="D MMM YYYY" withTitle>
                      {this.state.closing_date}
                      </Moment>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Locations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.job_location}</p>
                      </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Minimum Marks:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>Percentage :-{this.state.minimum_percentage}</p>
                      <p>CGPA :-{this.state.minimum_cgpa}</p>
                      <p>Grade :-{this.state.minimum_grade}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.description}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.status}</p>
                      </Col>
                    </FormGroup>
                    </TabPanel>
                  <TabPanel>
                  <Table columns={columns2} dataSource={this.state.suggestionPrintData} />
                  </TabPanel>
                  <TabPanel>
                  <div className="">
                      <Row>
                      <Col xs="12" md="2">
                      </Col>
                      <Col xs="12" md="5">
                      <Select
                        value={this.state.search_status}
                        onChange={this.handleChangeSearchStatus}
                        options={base_status}
                        placeholder ={"Filter by Status"}
                      />
                      </Col>
                      <Col md="4">
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.SearchWithState();
                        }}
                      >
                        Filter
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        className = "clear_button"
                        onClick={() => {
                          this.initialSelectedStudent();
                        }}
                      >
                        Clear
                      </Button>
                      
                      </Col>
                      </Row>
                  </div>
                  <hr/>
                  {this.state.suggestionAcceptPrintData.length === 0 ?
                  <div>No data found</div>
                  :
                  <div className="invite_student_table">
                  <Table columns={columns2}  dataSource={this.state.suggestionAcceptPrintData} />
                  </div>
                  }
                  </TabPanel>
                </Tabs>
                {this.filterButton()}
                </CardBody>
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}