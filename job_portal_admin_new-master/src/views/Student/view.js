import React, { Component } from "react";
import {Card,CardBody,CardFooter,CardTitle,CardText,Col,Form,FormGroup,Input,Label,Row,Alert,ListGroup, ListGroupItem} from "reactstrap";
import Button from "@material-ui/core/Button";
import RequestHandle from "../../components/RequestHandle";
import swal from "sweetalert";
import AuthService from "../../components/AuthService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactPlayer from 'react-player'
import { Line } from 'rc-progress';
import Modal from 'react-responsive-modal';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import BaseApi from '../../components/BaseApi';
import Moment from 'react-moment';

const Auth = new AuthService();

const Request = new RequestHandle();

export default class add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formdata: "",
      visible: false,
      alerttext: "",
      fname: "",
      lname: "",
      email: "",
      contact_no: "",
      payment_status: "",
      payment:'',
      college: "",
      course: "",
      age:"",
      attachment:'',
      gender:"male",
      project:"",
      grades:[],
      status: "",
      password: "",
      specific_acadamic_achivement: "",
      video: "",
      written_introduction_answer: "",
      written_introduction_question: "",
      written_introduction:"",
      written_test_result: "",
      academic_from: "",
      academic_to: "",
      new_password: "",
      conform_password: "",
      ChangePassword: false,
      tabIndex: 0,
      edit_profile:false,
      is_submited:false,
      is_approved:false,
      percentage:0,
      open: false,
      open_video_model:false,
      selectedFile: null,
      markSheet:null,
      loaded: 0,
      defult_permanant_address:"",
      defult_p_state:'',
      defult_p_city:'',
      defult_p_pin_code:'',
      permanant_address:"",
      p_state:'',
      p_city:'',
      p_pin_code:'',
      current_address:"",
      c_state:'',
      c_city:'',
      c_pin_code:'',
      checked:false,
      specialization:'',
      internship_details:'',
      employer:'',
      project_summary:'',
      internship_duration:'',
      overall_grade:'',
      minor_spc:'',
      major_spc:'',
      visibleTest:false,
      alerttextTest:'',
      internship:[],
      imagePreviewUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKb1XnU6gPufsz5DpyfCd7u2fbc-ZnRWZKPHfm899c4ouARWQ",
      file:""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printData = this.printData.bind(this);
    this.getData = this.getData.bind(this);
    this.DeleteQuery = this.DeleteQuery.bind(this);
    this.formProfile = this.formProfile.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.ChangePasswordformProfile = this.ChangePasswordformProfile.bind(this);
    this.tagSelect = this.tagSelect.bind(this);
    this.enrolledDetails = this.enrolledDetails.bind(this);
    this.basicDetails = this.basicDetails.bind(this);
    this.educationDetails = this.educationDetails.bind(this);
    this.skillSet = this.skillSet.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.printProfile = this.printProfile.bind(this);
    this.onChangeGrades = this.onChangeGrades.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onOpenVideoModal = this.onOpenVideoModal.bind(this);
    this.fileAttagment = this.fileAttagment.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.StatusUpdate = this.StatusUpdate.bind(this);
    this.Internship = this.Internship.bind(this);
    this.changePaymentStatus = this.changePaymentStatus.bind(this);
    
  }

  StatusUpdate(status){
    const universityData ={
      status : status,    
      }
      let that = this;

      swal({
        title: "Status Change Confirmation",
        text: "Are you sure that you want to Approve/Reject this Student?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        Request.RequestHandle('students/change_status/'+this.props.match.params.id,'POST',JSON.stringify(universityData),function(Result){
          if(Result.status){
           // that.setState({is_approved:true});
            that.printProfile();

          }
        }); 
      });
  }

  submitProfile(){
    let that = this;
    swal({
      title: "Submit Confirmation",
      text: "Are you sure that you want to Submit Your Profile?",
      icon: "success",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      Request.RequestHandle('student/submit/'+this.props.match.params.id,'GET', null,function(result){
     
        if(result.status){
      swal("Success!", "Your Profile has been submitted.", "success");
        }else{
  
        }
      }); 
    });
  }

  handleCheck(){
    this.setState({checked: !this.state.checked});   

    if(!this.state.checked){
      this.setState({permanant_address:this.state.current_address});
      this.setState({p_state:this.state.c_state});
      this.setState({p_city:this.state.c_city});
      this.setState({p_pin_code:this.state.c_pin_code});
    }else{   
      this.setState({permanant_address:this.state.defult_permanant_address});
      this.setState({p_state:this.state.defult_p_state});
      this.setState({p_city:this.state.defult_p_city});
      this.setState({p_pin_code:this.state.defult_p_pin_code});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
   
    // if(this.state.checked){
    //   this.setState({permanant_address:this.state.current_address});
    //   this.setState({p_state:this.state.c_state});
    //   this.setState({p_city:this.state.c_city});
    //   this.setState({p_pin_code:this.state.c_pin_code});
    // }
  }

  onChangeGrades(id,e){
    var grades = this.state.update_grades;
    this.setState({ [e.target.name]: e.target.value });
    grades.map((material,index) => { 
      if(material.id === id){
        grades[index] = {id:id,grades:e.target.value}
      }
    });
   this.setState({update_grades:grades });
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  fileAttagment = event => {
    this.setState({
      markSheet: event.target.files[0],
    })
  }

  onOpenModal = () => {
    var that = this;
    Request.RequestHandle('question','GET', null,function(result){
      if(result.status){
        that.setState({ open: true, written_introduction_question:result.data[0].question});
      }else{

      }
    }); 

  };


  onOpenVideoModal = () => {
    var that = this;
    that.setState({ open_video_model: true}); 

  };
 
  onCloseModal = () => {
    this.setState({ open: false });
    this.setState({ open_video_model: false });
  };

  componentDidMount = () => {
    if (this.props.history.location.state !== undefined) {
      if (this.props.history.location.state.password) {
        this.setState({
          ChangePassword: true
        });
      }
    }
    this.printProfile();
   
  };


  printProfile(){
    var that = this;
    Request.RequestHandle(
      "students/"+this.props.match.params.id,
      "GET",
      null,
      that.getData
    );
  }

  getData(result) {
    if (result.status) {
    
      var data = result.data.results[0];
      var btn = "Paid";
      if (data.payment_status === "not_paid") {
        btn = "Not Paid";
      }

      var college = "";
      if (data.college_doc.length > 0) {
        college = data.college_doc[0].name;
      }

      var course = "";
      if (data.course_doc.length > 0) {
        course = data.course_doc[0].name;
      }

      var major = "";
      if (data.major_doc.length > 0) {
        major = data.major_doc[0].name;
      }

      var minor = "";
      if (data.minor_doc.length > 0) {
        minor = data.minor_doc[0].name;
      }
    

      var grades = []
      var inital_grades = data.grade_doc;
     

      if(inital_grades.length !== 0 ){
        
        inital_grades.sort(function(a, b){return a.period_number - b.period_number});
      

      }

      data.grade_doc.map((material,index) => { 
        grades.push({id:material._id,grades:material.grades});
      });

      if (data.image !==undefined && data.image !==null && data.image !=="") {
        // image = data.image;
         this.setState({imagePreviewUrl:BaseApi.download_url+data.image});
       }

       if(result.data.percentage === 85){
        this.setState({percentage:100});
       }
        else{
         this.setState({percentage:result.data.percentage});
        }
        
      this.setState({
        status:data.status,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        contact_no: data.contact_no,
        age: data.age,
        is_submited:data.is_submited,
        defult_permanant_address:data.permanant_address,
        defult_p_state:data.p_state,
        defult_p_city:data.p_city,
        defult_p_pin_code:data.p_pin_code,
        permanant_address:data.permanant_address,
        p_state:data.p_state,
        p_city:data.p_city,
        p_pin_code:data.p_pin_code,
        current_address:data.current_address,
        c_state:data.c_state,
        c_city:data.c_city,
        c_pin_code:data.c_pin_code,
        gender:data.gender,
        project:data.project,
        specific_acadamic_achivement: data.specific_acadamic_achivement,
        video: data.video,
        written_introduction_answer: data.written_answer,
        written_introduction_question: data.written_question,
        written_introduction: data.written_introduction,
        written_test_result: data.written_test_result,
        academic_from: data.academic_from,
        academic_to: data.academic_to,
        is_approved:data.is_approved,
        payment_status: btn,
        payment: data.payment_status,
        college: college,
        course: course,
        grades:inital_grades,
        update_grades: grades,
        status: data.status,
        // percentage:result.data.percentage,
        attachment:data.attachment,
        specialization:data.specialization,
        internship_details:data.internship_details,
        employer:data.employer,
        // project_summary:data.project,
        internship_duration:data.internship_duration,
        overall_grade:data.overall_grade,
        minor_spc:minor,
        major_spc:major,
        internship:data.internship_doc

      });     
    }
  }


  saveProfile(){

    const studentData ={
      fname : this.state.fname,
      lname:this.state.lname,
      contact_no:this.state.contact_no,
      age:this.state.age,
      current_address:this.state.current_address,
      c_state:this.state.c_state,
      c_city:this.state.c_city,
      c_pin_code:this.state.c_pin_code,
      p_state:this.state.p_state,
      p_city:this.state.p_city,
      p_pin_code:this.state.p_pin_code,
      permanant_address:this.state.permanant_address,
      gender:this.state.gender,
      project:this.state.project,
      academic_from:this.state.academic_from,
      academic_to:this.state.academic_to,
      internship_details:this.state.internship_details,
      employer:this.state.employer,
      project_summary:this.state.project_summary,
      internship_duration:this.state.internship_duration,
      overall_grade:this.state.overall_grade
    }
    const list ={
      list:this.state.update_grades
    }

    if(this.state.markSheet === null || this.state.markSheet ==="" || this.state.markSheet ===undefined){

    }else{
      const markSheet = new FormData()
      markSheet.append('attachment', this.state.markSheet);
      Request.UploadRequestHandle('students/attachment/'+ Auth.getProfile().id,'POST',markSheet,function(result){
      
      }); 
    }
   
    var that = this;
    Request.RequestHandle('grade/update','POST', JSON.stringify(list),function(result){
    }); 

    Request.RequestHandle('students/'+ Auth.getProfile().id,'POST', JSON.stringify(studentData),function(result){
      if(result.status){
      swal("Success!", "Your Profile has been Updated.", "success");
        that.setState({edit_profile:false});
        that.printProfile();
      }else{
        swal("Error!", result.msg, "error");

      }
    }); 

   
  }

  deleteData(status) {
    swal({
      title: "Payment Status Change Confirmation",
      text: "Are you sure that you want to " + status + " this Student?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.setState({
          isLoadedData: true
        });
        this.DeleteQuery(status);
        this.setState({
          isLoadedData: false
        });
      } else {
      }
    });
  }

  DeleteQuery = status => {
    var that = this;
    const statusData = {
      status: status
    };
    Request.RequestHandle(
      "students/payment_status/" + this.props.match.params.id,
      "POST",
      JSON.stringify(statusData),
      function(result) {
        if (result.status) {
          var btn = (
            <div>
              {" "}
              <Button
                variant="contained"
                className="active_button"
                color="primary"
                size="small"
                onClick={() => {
                  that.deleteData("not_paid");
                }}
              >
                paid
              </Button>
            </div>
          );
          if (status === "not_paid") {
            btn = (
              <div>
                {" "}
                <Button
                  variant="contained"
                  className="active_button"
                  color="secondary"
                  size="small"
                  onClick={() => {
                    that.deleteData("paid")
                  }}
                >
                  not paid
                </Button>
              </div>
            );
          }

          that.setState({ payment_status: btn });
        }
      }
    );
  };

  handleSubmit(event) {
    event.preventDefault();
    const universityData = {
      password: this.state.password,
      new_password: this.state.new_password,
      conform_password: this.state.conform_password
    };

    Request.RequestHandle(
      "students/change_password/" + Auth.getProfile().id,
      "POST",
      JSON.stringify(universityData),
      this.printData
    );
  }

  printData(Result) {
    if (Result.status) {
      this.setState({
        password: "",
        new_password: "",
        conform_password: ""
      });

      swal("Success!", "Your information has been submitted.", "success");
    } else {
      this.setState({ alerttext: Result.msg, visible: true });
    }
  }

  resetForm() {
    this.setState({
      name: "",
      email: "",
      contact_no: "",
      website: "",
      address: "",
      state: "",
      city: "",
      pin_code: "",
      hr_name: "",
      hr_email: "",
      hr_contact_no: "",
      status: ""
    });
  }

  tagSelect(tagSelect) {
    this.setState({ tabIndex: tagSelect });
    if (tagSelect === 1) {
      this.setState({ footerButton: false });
    } else {
      this.setState({ footerButton: true });
    }
  }
  enrolledDetails(){
    return (
      <div>
        <div className="profile-cover">
        <img className="profile-img" src={this.state.imagePreviewUrl}/>
            <div className="profile-name">
              {this.state.fname} {this.state.lname}
              <div> 
                <span>{this.state.email} | </span> 
                <span>{"+" + this.state.contact_no}</span>
              </div>
              <div> 
                <span>{this.state.course} @ </span> 
                <span>{this.state.college}</span>
              </div>
            </div>
        </div>
      </div>
    );
  }

  basicDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Personal Info</p>
          </Col>
        </FormGroup>
        <FormGroup row>
        <Col md="2">
            <Label htmlFor="text-input">Date of Birth:</Label>
          </Col>
          <Col xs="12" md="4">
          {this.state.age !=="" && this.state.age !==undefined && this.state.age !==null &&
          <Moment format="D MMM YYYY" withTitle>
          {this.state.age}
            </Moment>
          }
          
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Gender:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.gender}</p>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Current Address</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.current_address}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.c_state}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.c_city}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.c_pin_code}</p>
          </Col>
        </FormGroup>
      
      
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Permanant Address</p>
          </Col>
          
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.permanant_address}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.p_state}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.p_city}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.p_pin_code}</p>
          </Col>
        </FormGroup>
     
      </div>
    );
  }

  educationDetails() {

    const attachment = this.state.attachment;
    let selectAttage ="";
    if(attachment === undefined || attachment=== null || attachment ===""){
      selectAttage ="Not uploaded yet";
    }else{
      selectAttage=<a href={BaseApi.download_url+this.state.attachment} target="_blank"><img src="https://freeiconshop.com/wp-content/uploads/edd/download-flat.png" width={30} title="Click to view the Mark Sheet" /></a>;
    }
  
    return (
      <div>
         <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Education</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">College:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.college}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Course:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.course}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Specialization(Minor):</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.minor_spc}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Specialization(Major):</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.major_spc}</p>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col  xs="2" md="2">
            <Label htmlFor="email-input">Academic Duration:</Label>
          </Col>
          <Col xs="4" md="2">
            <p>From {this.state.academic_from} to {this.state.academic_to}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Grades:</Label>
          </Col>
          <Col xs="12" md="9">
            <ListGroup>
            {this.state.grades.map((material,index) => {
              return (<ListGroupItem className="col-md-6">
                        <Row className="list_row">
                          <Col md="6">{material.course_type} {material.period_number}:</Col>
                          <Col xs="12" md="6">
                            <p>{material.grades}</p>
                          </Col>
                        </Row>
              </ListGroupItem>)
            })}
            </ListGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Overall Grade:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.overall_grade}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Marks Sheet:</Label>
          </Col>
          <Col xs="12" md="9">
          {selectAttage}
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Project:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.project}</p>
          </Col>
        </FormGroup>

        
          
      
      </div>
    );
  }


  skillSet(){
  
    const video = this.state.video;
    let selectVideo ="";
    if(video === undefined || video=== null || video ===""){
      selectVideo ="Video not uploaded yet";
    }else{
      selectVideo=<a  target="_blank" href={BaseApi.download_url+this.state.video} download>Play Video</a>;
    }

    return (
      <div>
         <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Skills:</Label>
          </Col>
          <Col xs="12" md="10">
          <p className="bold">{this.state.written_introduction_question}</p>
          <p>{this.state.written_introduction_answer}</p>
          </Col>
        </FormGroup>
       
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Video Introduction:</Label>
          </Col>
          <Col xs="12" md="9">
          {selectVideo}
          </Col>
        </FormGroup>
        {/* {this.state.written_test_result ===null || this.state.written_test_result ==="" || this.state.written_test_result ===undefined ?
          <FormGroup row>
            <Col md="2">
              <Label htmlFor="text-input">Written Test:</Label>
            </Col>
            <Col xs="12" md="9">
            <p>Not Attend</p>
            </Col>
          </FormGroup>
          :
          <FormGroup row>
            <Col md="2">
              <Label htmlFor="text-input">Written Test Result:</Label>
            </Col>
            <Col xs="12" md="9">
            <p>{this.state.written_test_result}</p>
            </Col>
          </FormGroup> 
          } */}
      </div>
    );
  }

  editSkillSet(){
    return (
      <div>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Introduction:</Label>
          </Col>
          <Col xs="12" md="10">
          <Input
                type="textarea"
                id="written_introduction"
                name="written_introduction"
                value={this.state.written_introduction}
                onChange={this.onChange}
                placeholder="Written Introduction"
                />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Written Test:</Label>
          </Col>
          <Col xs="12" md="9">
          <div> 
                <p className="qution">{this.state.written_introduction_question}</p>
                <p className="answer">{this.state.written_introduction_answer}</p>
              </div>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Video Introduction:</Label>
          </Col>
          <Col xs="12" md="9">

          {/* <FilePond ref={ref => this.pond = ref}
                          files={this.state.files}
                          maxFiles={1} 
                          fileExtension = {'video'}
                          oninit={() => this.handleInit() }
                          onupdatefiles={fileItems => {
                              this.fileUpload(fileItems);
                          }}>
                </FilePond> */}
                <div> 
            <a href={BaseApi.download_url+this.state.video} target="_blank" download>Play Video</a>
              </div>
          </Col>
        </FormGroup>
        <hr/>
        {this.state.written_test_result ===null && this.state.written_test_result ==="" && this.state.written_test_result ===undefined ?
        <FormGroup row>
        
          <Col md="4">
            <Label htmlFor="text-input">Written Test Result:</Label>
          </Col>
          <Col xs="12" md="8">
          <p>{this.state.written_test_result}</p>
          </Col>
        </FormGroup>
        :
        ""
        }
       
      </div>
    );
  }

  editBasicDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Personal Info</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Age:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="age"
                name="age"
                value={this.state.age}
                onChange={this.onChange}
                placeholder="Age"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Gender:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input type="select" 
                name="gender" 
                id="gender"  
                value={this.state.gender}
                onChange={this.onChange}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </Input>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col>
            <p>Cureent Address</p>
          </Col>
          
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="current_address"
                name="current_address"
                value={this.state.current_address}
                onChange={this.onChange}
                placeholder="Address"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="c_state"
                name="c_state"
                value={this.state.c_state}
                onChange={this.onChange}
                placeholder="State"
                />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="c_city"
                name="c_city"
                value={this.state.c_city}
                onChange={this.onChange}
                placeholder="City"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="c_pin_code"
                name="c_pin_code"
                value={this.state.c_pin_code}
                onChange={this.onChange}
                placeholder="Pincode"
                />
          </Col>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox"
            onChange={this.handleCheck}
            defaultChecked={this.state.checked}
             />{' '}
            Same as current address
          </Label>
        </FormGroup>
        
        <FormGroup row>
          <Col>
            <p>Permanant Address</p>
          </Col>
          
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
             <Input
                type="text"
                id="current_address"
                name="current_address"
                value={this.state.permanant_address}
                onChange={this.onChange}
                placeholder="Address"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="p_state"
                name="p_state"
                value={this.state.p_state}
                onChange={this.onChange}
                placeholder="State"
                />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="p_city"
                name="p_city"
                value={this.state.p_city}
                onChange={this.onChange}
                placeholder="City"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="p_pin_code"
                name="p_pin_code"
                value={this.state.p_pin_code}
                onChange={this.onChange}
                placeholder="Pincode"
                />
          </Col>
        </FormGroup>
       
      </div>
    );
  }


  editEducationDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Education</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">College:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.college}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Course:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.course}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Specialization:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.specialization}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col  xs="2" md="2">
            <Label htmlFor="email-input">Academin Duration From:</Label>
          </Col>
          <Col xs="4" md="4">
            <Input type="number" 
            name="academic_from" 
            id="academic_from" 
            value = {this.state.academic_from}
            onChange={this.onChange}
             />
          </Col>
          <Col  xs="2" md="2">
            <Label htmlFor="email-input">To:</Label>
          </Col>
          <Col xs="4" md="4">
            <Input type="number" 
            name="academic_to" 
            id="academic_to" 
            value = {this.state.academic_to}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Grades:</Label>
          </Col>
          <Col xs="12" md="9">
            <ListGroup>
            {this.state.grades.map((material,index) => {
              return (<ListGroupItem>
                        <Row className="list_row">
                          <Col md="3">{material.course_type} {material.period_number}:</Col>
                          <Col xs="12" md="9">
                            <Input
                              type="text"
                              name="grades[]"
                              defaultValue={material.grades}
                              value={this.state.grade}
                              onChange={(e) => this.onChangeGrades(material._id, e)}
                              placeholder="Grade"
                              />
                          </Col>
                        </Row>
              </ListGroupItem>)
            })}
            </ListGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Overall Grade:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="number" 
            name="overall_grade" 
            id="overall_grade" 
            value = {this.state.overall_grade}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Marks Sheet:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input 
            type="file" 
            onChange={this.fileAttagment} style={{ height: 200 }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Projects:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="textarea" 
            name="project" 
            id="project" 
            value = {this.state.project}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Internship</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Employer:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="text" 
            name="employer" 
            id="employer" 
            value = {this.state.employer}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Internship Details:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="textarea" 
            name="internship_details" 
            id="internship_details" 
            value = {this.state.internship_details}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Internship Duration(Month):</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="number" 
            name="internship_duration" 
            id="internship_duration" 
            value = {this.state.internship_duration}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Projects:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="textarea" 
            name="project_summary" 
            id="project_summary" 
            value = {this.state.project_summary}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>
      </div>
    );
  }

  Internship(){
    return(
      <div>
      <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Internship</p>
          </Col>
        </FormGroup>
      {this.state.internship.map((material,index) => {
        return(<div>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Employer:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.employer}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Internship Details:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.internship_details}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Internship Duration:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.internship_duration}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Project:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.project_summary}</p>
           </Col>
         </FormGroup>
         <hr/>
        </div>)
       
      })
      }
         
      </div>
    )
   }
 
   editInternship(){
     return(
       <div>
        <FormGroup row>
         <Col xs="12" md="12">
         <Button type="button" variant="contained"   onClick={() => {this.setState({open_intern_model:true}) }}  >New</Button>
         </Col>
       </FormGroup>
       <hr/>
       <FormGroup row>
         <Col md="2">
           <Label htmlFor="email-input">Employer:</Label>
         </Col>
         <Col xs="12" md="9">
         <p>{this.state.employer}</p>
         </Col>
       </FormGroup>
       <FormGroup row>
         <Col md="2">
           <Label htmlFor="email-input">Description:</Label>
         </Col>
         <Col xs="12" md="9">
         <p>{this.state.internship_details}</p>
         </Col>
       </FormGroup>
       
       <FormGroup row>
         <Col md="2">
           <Label htmlFor="email-input">Internship Duration:</Label>
         </Col>
         <Col xs="12" md="9">
         <p>{this.state.internship_duration}</p>
         </Col>
       </FormGroup>
 
       <FormGroup row>
         <Col md="2">
           <Label htmlFor="email-input">Projects:</Label>
         </Col>
         <Col xs="12" md="9">
         <p>{this.state.project}</p>
         </Col>
       </FormGroup>
    </div>
     )
      
    }

 

  formProfile() {
    return (
      <Form
        ref={el => (this.myFormRef = el)}
        encType="multipart/form-data"
        className="form-horizontal"
      >

        <div className="profile-header">
          <Line className="progress_bar" percent={this.state.percentage} strokeWidth="1" title={ "Profile Completeness: " + this.state.percentage + "%"} strokeColor="#08A700" />
          <div className="progress_text" title={ "Profile Completeness: " + this.state.percentage + "%"}>{this.state.percentage}%</div>
          <div className ="basic-info">
            {this.enrolledDetails()}
          </div>
        </div>

        <CardBody>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.tagSelect(tabIndex)}
          >
            <TabList style={{marginBottom: "20px"}}>
            <Tab>Profile</Tab>
              <Tab>Education</Tab>
              <Tab>Internship</Tab>
              <Tab>Our Assessment</Tab>
            </TabList>
            {this.state.edit_profile ? <TabPanel>{this.editBasicDetails()}</TabPanel> : <TabPanel>{this.basicDetails()}</TabPanel>}
            {this.state.edit_profile ? <TabPanel>{this.editEducationDetails()}</TabPanel> : <TabPanel>{this.educationDetails()}</TabPanel>}
            {this.state.edit_profile ? <TabPanel>{this.editInternship()}</TabPanel> : <TabPanel>{this.Internship()}</TabPanel>}           
            {this.state.edit_profile ? <TabPanel>{this.editSkillSet()}</TabPanel> : <TabPanel>{this.skillSet()}</TabPanel>}
          </Tabs>
        </CardBody>
      </Form>
    );
  }

  ChangePasswordformProfile() {
    return (
      <Form
        ref={el => (this.myFormRef = el)}
        onSubmit={this.handleSubmit}
        encType="multipart/form-data"
        className="form-horizontal"
      >
        <CardBody>
          <Alert color="light" isOpen={this.state.visible}>
            {this.state.alerttext}
          </Alert>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Old Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">New Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="new_password"
                name="new_password"
                value={this.state.new_password}
                onChange={this.onChange}
                placeholder="New Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Confirm Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="conform_password"
                name="conform_password"
                value={this.state.conform_password}
                onChange={this.onChange}
                placeholder="Confirm Password"
              />
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.passwordChange();
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }

  passwordChange() {
    this.setState({
      ChangePassword: !this.state.ChangePassword
    });

    this.setState({
      password: "",
      new_password: "",
      conform_password: ""
    });
  }

  writtenExamSave(){
    if(this.state.written_introduction_answer === "" || this.state.written_introduction_answer === null || this.state.written_introduction_answer === undefined){
      this.setState({
        written_introduction_answer: ""
      });
    }else{

      const writtng_data ={
        writen_introduction_answer: this.state.written_introduction_answer,
        writen_introduction_question: this.state.written_introduction_question,
      };
      let that = this;
      Request.RequestHandle('students/skillset/'+ Auth.getProfile().id,'POST', JSON.stringify(writtng_data),function(result){
      
        if(result.status){
      

        swal("Success!", "Written Test has been submitted.", "success");
        that.setState({edit_profile:false});
        that.printProfile();
        that.onCloseModal();

        }else{
          that.setState({alerttextTest:result.msg,visibleTest:true});

        }
      }); 
    }
  }


  fileUpload(fileItems){
   

    const data = new FormData()
    data.append('video', this.state.selectedFile);
    var that = this;
    Request.UploadRequestHandle('students/video/'+ Auth.getProfile().id,'POST',data,function(result){
    
        if(result.status){
     

        swal("Success!", "video introduction has been submitted.", "success");
        that.setState({edit_profile:false});
        that.onCloseModal();
        that.printProfile();
        }else{
        swal("Error!", result.msg, "error");

          that.setState({alerttextTest:result.msg,visibleTest:true});
        }
    }); 
  }

  changePaymentStatus(){
    const that  = this;
    swal({
      title: "Payment Status Change Confirmation",
      text: "Are you sure that you want to mark this student as paid?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      const statusData ={
        status:"paid"}
      if (willDelete) {
        Request.RequestHandle('students/payment_status/'+that.props.match.params.id,'POST', JSON.stringify(statusData),function(result){
          if (result.status) {
            that.printProfile();
        }
        }); 
      } else {
      }
    });
  }

  render() {
    let button = '';
    if(this.state.payment === "paid"){
      if (this.state.is_submited === true) {
        if (this.state.is_approved) {
          button = <Button type="button" variant="contained" color="primary" className="center_btn"  onClick={()=>{this.StatusUpdate('reject')}}  >Reject</Button>;
        } else {
          button = <Button type="button" variant="contained" color="secondary" className="center_btn"  onClick={()=>{this.StatusUpdate('approved')}}  >approve</Button>;
        }
      } else {
        button = <Button type="button" variant="contained" color="secondary" className="center_btn"  onClick={()=>{this.StatusUpdate('approved')}}  disabled>Not submitted</Button>;        
      }

    }else{
      button = <Button type="button" variant="contained" color="secondary" className="center_btn"  onClick={()=>{this.changePaymentStatus()}}  >Paid</Button>;        
    }
   
    return (
      <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
          Profile
        </div>
           
        <Row>
          <Col>
            <Card>
            {this.formProfile()}
            <CardFooter>
                {button}
                </CardFooter>
            </Card>
          </Col>
        </Row>
        <div />
      </div>
    );
  }
}
