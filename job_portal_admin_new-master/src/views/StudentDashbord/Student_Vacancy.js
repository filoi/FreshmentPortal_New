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
    FormFeedback
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
import AuthService from "../../components/AuthService";
import Vacancy from "./Student_View_Vacancy_popup";
import Moment from 'react-moment';

const Auth = new AuthService();
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
    title: 'Vacancy',
    dataIndex: 'vacancy',
    key: 'vacancy',
    width: '100%',
  }];

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

    
  const status = [
//       {
//     label: 'Student Feedback Awaited',
//     value: 1,
//   },
  {
    label: 'Interview Invite Accepted',
    value: 2,
  },
  {
    label: 'Interview Invite Rejected',
    value: 3,
  },
  // {
  //   label: 'Rejected',
  //   value: 4,
  // },
  // {
  //   label: 'Offer Request Pending',
  //   value: 5,
  // },
  {
    label: 'Offer Request Rejected',
    value: 6,
  },
  // {
  //   label: 'Offer Given',
  //   value: 7,
  // },{
  //   label: 'Offer Reject',
  //   value: 9,
  // }
];



  
 

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
          desired_educational_qualification:'',     
          job_location:'',   
          job_start_date:'',     
          desired_skills:'',     
          minimum_marks_required:'',
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
          value: { min: 20, max: 30 },

          graduated_year:'',
          min_overall_grade:'',
          openStatusModel:false,
          change_status:[],
          selected_status:'',
          selected_status_vacancy_id:'',
          search_status:'',
          data: [],
          pagination: {},
          loading: false,
          status_val:"" ,
          openVacancy:false,
          vacancy_id:"" 

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
        this.SearchWithState = this.SearchWithState.bind(this);
        this.filterSelectedStudent = this.filterSelectedStudent.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        
      }

      handleChangeUniversityFilter = (selectedOption) => {
        this.setState({ searchUniversity:selectedOption });
      }

      handleChangeSearchStatus = (selectedOption) => {
        this.setState({ search_status:selectedOption });
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
         
          if(result.status){
            that.setState({collegeFilter:[]});          
            var collegeFilter =[];
                result.data.results.map(item => { 
                  collegeFilter.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
                that.setState({collegeFilter});
          }
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
        this.setState({ openStatusModel: false,openVacancy:false});

      };

      SearchWithState(){
        this.filterSelectedStudent(this.state.search_status);
      }

      componentDidMount = () => {
        this.initialSelectedStudent();
      }

      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.initialSelectedStudent({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }

      initialSelectedStudent = (params = {}) => {
        this.setState({search_status:''})
        this.setState({ loading: true });
        if(params.page === undefined){
          params.page = 1;
        }

        var status_val ="";
        if(params.status_val === undefined || params.status_val === null || params.status_val === ""){
          status_val = "";
        }else{
          status_val = '&status='+params.status_val;
        }
        Request.RequestHandle('vacancy/students/'+Auth.getProfile().id+'?page='+params.page+status_val,'GET',null,this.getAccepted); 
      }

      filterSelectedStudent(status_val){
      this.initialSelectedStudent({status_val:status_val.value});
      }

      clearFilter(){
       // this.setState({status_val:""});
        this.initialSelectedStudent();
        }

      filterSubmit(){
        let searchUniversity = [];
        this.state.searchUniversity.map(item =>{
          searchUniversity.push(item.value)
        })
        let searchCollege = [];
        this.state.searchCollege.map(item =>{
          searchCollege.push(item.value)
        })
        let searchSpecializations = [];
        this.state.searchSpecializations.map(item =>{
          searchSpecializations.push(item.value)
        })
        let searchCourse = [];
        this.state.searchCourse.map(item =>{
          searchCourse.push(item.value)
        })
        
        let filter = {
          'searchUni':searchUniversity,
          'searchSpecialization':searchSpecializations,
          'searchCollege':searchCollege,
          'searchCourse':searchCourse,
          'searchGender':this.state.searchGender.value,
          'min_age':this.state.value.min,
          'max_age':this.state.value.max,
          'graduated_year':this.state.graduated_year,
          'min_overall_grade':this.state.min_overall_grade,
        }
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
           const pagination = { ...this.state.pagination };
           pagination.total = result.data.count;
           pagination.pageSize = result.data.pagesize;
           this.setState({  loading: false,pagination }); 
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
        if(this.state.suggestionData.length !==0 ){
        this.state.suggestionData.map((item,key) => {
          let name = <a className="link" href  onClick={()=>{this.viewAcceptStudent(item.student_doc[0]._id)}}><b>{item.student_doc[0].fname + " " + item.student_doc[0].lname}</b></a> 
          let action =  <span><a href   onClick={()=>{this.actionInvite(key,'accept',item.student_doc[0]._id)}}>Invite</a><Divider type="vertical" /><a href  onClick={()=>{this.actionInvite(key,'reject',item.student_doc[0]._id)}}>Delete</a></span>
          suggestionPrintData.push({key:key,fname:name,college:item.college_doc[0].name,course:item.course_doc[0].name,specialization_major:item.major_doc[0].name + ", " + item.minor_doc[0].name,action:action})
        }); 
        this.setState({suggestionPrintData});
      }
      }

      setAcceptTable(){
        let suggestionAcceptPrintData =[];
      
        this.state.suggestionAcceptData.map((item,key) => {
          let name = <a href  onClick={()=>{this.viewAcceptStudent(item.vacancy_doc[0]._id)}}><b>{item.vacancy_doc[0].job_title}</b></a> 
          let action = "";
          let status_label = "";
          let interview_button = "";
          let current_status='';
          let action_button='';
          base_status.map((value,index) =>{
          if(value.value === parseInt(item.status)){
           status_label= value.label;
           action_button =  <div className="table-action-button">{this.statusAction(item.vacancy_doc[0]._id,index)}</div>
           current_status = <div className= "specialization-div">
                                <div className="table-specialization-title">Status: </div> 
                                <div className="table-specialization">{ status_label}</div></div>
          //  action =  <span><a href   onClick={()=>{this.statusChange(item.vacancy_doc[0]._id,key)}}>{value.label}</a></span>
          }
         })



         var table = <div className ="table-conts">
                    <div className="table-student">{name}</div>
                    <div className="table-interview">{''}</div>
                    {/* <div className="table-course">{item.employer_doc[0].name}</div> */}
                    <div className= "specialization-div"><div className="table-specialization-title">Employer/Company: </div> <div className="table-specialization">{item.employer_doc[0].name}</div></div>
                    <div className= "specialization-div"><div className="table-specialization-title">Locations: </div> <div className="table-specialization">{ item.vacancy_doc[0].job_location}</div></div>
                    <div className= "specialization-div"><div className="table-specialization-title">No. of Position:</div> <div className="table-specialization">{ item.vacancy_doc[0].number}</div></div>
                    <div className= "specialization-div"><div className="table-specialization-title">Last date of Application: </div> <div className="table-specialization">
                    <Moment format="D MMM YYYY" withTitle>
                    { item.vacancy_doc[0].closing_date}
                        </Moment>
                    </div></div>
                      {action_button}
                      {current_status}
                      </div>
          suggestionAcceptPrintData.push({key:key,vacancy:table});
          // ,employe_name:item.employer_doc[0].name,closing_date:item.vacancy_doc[0].closing_date,action:action
        }); 
        this.setState({suggestionAcceptPrintData});
    }


    statusAction(vacancy_id,status_id){
      // this.setState({change_status:status});
       var new_status = [];
    //  status_id++;
    
      let action = ""
       if(status_id === 0){
        action =  <span><a className="btn status_tags green" href   onClick={()=>{this.updateStatus(vacancy_id,base_status[1].value)}}>Accept</a><a className="btn status_tags red" href   onClick={()=>{this.updateStatus(vacancy_id,base_status[2].value)}}>Reject</a></span>
        
       }else if(status_id === 1){
         //new_status.push(base_status[0]);
       }else if(status_id === 2){

       }else if(status_id === 3){
         //new_status.push(base_status[1]);
       }else if(status_id === 4){
        action =  <span><a className="btn status_tags green" href   onClick={()=>{this.updateStatus(vacancy_id,base_status[7].value)}}>Accept</a><a className="btn status_tags red" href   onClick={()=>{this.updateStatus(vacancy_id,base_status[5].value)}}>Reject</a></span>         
       }else if(status_id === 5){

      }else if(status_id === 6){
       }
     
        return action;
      }



    statusChange(vacancy_id,status_id){
      var new_status = [];

      if(status_id === 0){
        new_status.push(status[0]);
        new_status.push(status[1]);
      }else if(status_id === 4){
        new_status.push(status[2]);
      }
    
    this.setState({change_status:new_status,selected_status_vacancy_id:vacancy_id});
    this.isOpenStatusPopup();
     }

     updateStatus(vacancy_id,status_id){
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
          status:status_id,
          student_id:Auth.getProfile().id,
          vacancy_id:vacancy_id,
        }
        let that = this;
 
        Request.RequestHandle('vacancy/candidates/change_status/','POST',JSON.stringify(upset),function(result) {
       
            that.onCloseModal();
          if(result.status){
            
          //  swal("Success!", "Your information has been submitted.", "success");
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
        var actionData={
          accept:action
        };
        let that = this;
        Request.RequestHandle('employer/vacancy/'+this.props.match.params.id+'/student/'+student_id+'/invite','POST',JSON.stringify(actionData),function(result){
          if (result.status) {
           
            let suggestionData =that.state.suggestionData;
            delete suggestionData[key]; 
            that.setState({suggestionData});
            that.setInviteTable();
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
        this.setState({openVacancy:true,vacancy_id:id});
      //   this.props.history.push({
      //     pathname: '/Student/Vacancies/View/'+id,
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
            desired_educational_qualification:data.desired_educational_qualification,    
            job_location:data.job_location,    
            job_start_date:data.job_start_date,    
            desired_skills:data.desired_skills,    
            minimum_marks_required:data.minimum_marks_required,    
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

  


    filterModel(){
     return( <Modal open={this.state.filter_open} onClose={this.onCloseModal} center>
      <Row>
        <Col>
          <Card>
          <CardBody>
          <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text"  id="searchName" name="searchName" value={this.state.searchName} onChange ={this.onChange} placeholder=""/>                     
                      </Col>
          </FormGroup>
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
                <Input type="text"  id="min_overall_grade" name="min_overall_grade" value={this.state.min_overall_grade} onChange ={this.onChange} placeholder=""/>
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

          <Modal open={this.state.openVacancy} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody>
            <Vacancy id={this.state.vacancy_id}/>
           </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>



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
                          this.clearFilter();
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
                 <Table
                    columns={columns2}
                    dataSource={this.state.suggestionAcceptPrintData}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
                  }

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
