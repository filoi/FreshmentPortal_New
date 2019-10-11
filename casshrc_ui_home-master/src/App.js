import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Alert,Button, Card,FormGroup, Label, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import './App.css';
import Modal from 'react-responsive-modal';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from './components/AuthService';
import swal from 'sweetalert';
import Select from 'react-select';
import BaseApi from './components/BaseApi';
import createHistory from 'history/createBrowserHistory'
import RequestHandle from "./components/RequestHandle";
// var Recaptcha = require('react-recaptcha');
import { Async } from 'react-select';

const selectStyles = {
  menu: base => ({
    ...base,
    zIndex: 100
  })
};

const Request = new RequestHandle();

const history = createHistory()
const Auth = new AuthService();
const recaptchaRef = React.createRef();

let style ={
  cursor:'pointer'
};

const techCompanies = [
  { label: "Minor", value: "minor" },
  { label: "Major", value: "major" },
];


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        open: false,
        openforget:false,
        studentLoginOpen: false,
        studentOpen: false,
        submitted: false,
        captch:true,
        restext:'Sign In to your account',
        college_details: {},
        course_details:{},
        college:[],
        course:[], 
        resstudenttext:'',
        visible: false,
        alerttext:'',
        loggedIn:false,
        specialization:[],
        specializationMinor:[],
        courseOption:[],
        selectedCourseOption:null,
        collegeOption:[],
        selectedCollegeOption:null,
        otherCollege:false,
        specialization_minor:null,
        specialization_major:null,
        from_year:null,
        to_year:null,
        specializationOption:[],
        selectedMajorOption:{},
        selectedMinorOption:{},
        forgetEmail:null,
        resetPassrestext:'',
        selectedResetRole:'',
        course_disable:true,
        college_disable:true,
        major_disable:true,
        minor_disable:true,
        academic_from:'',
        academic_to:'',
        courseData:[],
        collegeData:[],
        paySuccess:false,
        payModel:false,
        payUser:{},
        uid:"",
        success_name:"",
        college_name:"",
        college_contact:"",
        college_email:"",
        contact_no:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);
    this.onChange = this.onChange.bind(this); 
    this.handleSubmitEnrol = this.handleSubmitEnrol.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.StudentHandleSubmit = this.StudentHandleSubmit.bind(this);
    this.handleChangeSpecializationsMinor = this.handleChangeSpecializationsMinor.bind(this);
    this.handleChangeSpecializationsMajor = this.handleChangeSpecializationsMajor.bind(this);
    this.Specialization = this.Specialization.bind(this);
    this.onChangeSelectCourseOption = this.onChangeSelectCourseOption.bind(this);
    this.changeCourse = this.changeCourse.bind(this);

    this.onChangeSelectCollegeOption = this.onChangeSelectCollegeOption.bind(this);
    this.changeCollege = this.changeCollege.bind(this);

    this.onChangeSelectMajorOption = this.onChangeSelectMajorOption.bind(this);
    this.onChangeSelectMinorOption = this.onChangeSelectMinorOption.bind(this);
    this.changeSpecialization = this.changeSpecialization.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmitResetPassword = this.handleSubmitResetPassword.bind(this);
    this.ForgetPassword = this.ForgetPassword.bind(this);
    this.initStatePayment = this.initStatePayment.bind(this);
    this.otherCollege = this.otherCollege.bind(this);
    
}


onChangeSelectMajorOption(selectedMajorOption){
  this.setState({selectedMajorOption});
 
}

onChangeSelectMinorOption(selectedMinorOption){
  this.setState({selectedMinorOption});
 
}

ForgetPassword(role){
  this.onCloseModal();
  this.setState({openforget:true,selectedResetRole:role});
}

handleSubmitResetPassword(e){
  e.preventDefault();
  const universityData={
    email:this.state.forgetEmail,
    role:this.state.selectedResetRole
  }
  var that  =this;
  Request.RequestHandle('students/role/forgetpassword/','POST',JSON.stringify(universityData),function(result) {
    if(result.status){
      that.onCloseModal();
        swal("Success!", result.msg, "success");
    }else{
      that.setState({
        resetPassrestext: result.msg,
      });
    }
    })
}

changeSpecialization(inputValue){
  var that =this;
  if(inputValue === null || inputValue === "" || inputValue === undefined){
    that.setState({courseOption:[]});  
    //that.setState({ selectedCourseOption:null });

  }else{
  Request.RequestHandle( "course?search="+inputValue,'GET',null,function(result) {
    if(result.status){
      that.setState({ selectedCourseOption:{} });
      that.setState({courseOption:[]});              
      var courseOption =[];
          result.data.results.map(item => { 
            courseOption.push({
              'label':item.name,
              'value':item._id,
              });
          });
          that.setState({courseOption});
    }
   
      }); 
  }
}

onChangeSelectCourseOption(selectedCourseOption){
  this.setState({selectedCourseOption,major_disable:false});
  this.Specialization(this.state.selectedCollegeOption.value,selectedCourseOption.value);
  this.initCollege();
 
}


changeCourse(inputValue){
  var that =this;
  if(inputValue === null || inputValue === "" || inputValue === undefined){
    that.setState({courseOption:[]});  
    //that.setState({ selectedCourseOption:null });

  }else{
  Request.RequestHandle( "ccs/getall/course/"+that.state.selectedCollegeOption.value+"/courses",'GET',null,function(result) {
    if(result.status){
      that.setState({ selectedCourseOption:{} });
      that.setState({courseOption:[]});              
      var courseOption =[];
          result.data.map(item => { 
            courseOption.push({
              'label':item.name,
              'value':item._id,
              });
          });
          that.setState({courseOption});
    }
   
      }); 
  }
}

onChangeSelectCollegeOption(selectedCollegeOption){
  this.setState({selectedCollegeOption , course_disable:false});
  this.setState({otherCollege:false});
  this.initCourse(selectedCollegeOption);
 this.initCollege();
}


changeCollege(inputValue){ 
  var that =this;
  if(inputValue === null || inputValue === "" || inputValue === undefined){
    var collegeOption =[];
    collegeOption.push({'label':'Other','value':'other'});
    that.setState({collegeOption});  
  }else{
  Request.RequestHandle( "college/getall/full?search="+inputValue,'GET',null,function(result) {
      var collegeData =[];
          result.data.map(item => { 
            collegeData.push({
              'label':item.name,
              'value':item._id,
              });
          });
          that.setState({collegeData});
      }); 
  }
}


onDismiss() {
  this.setState({ visible: false });
}

handleChangeCollege = (college_details) => {
  this.setState({ college_details });
  this.get_course(college_details.value); 

  if(college_details.value==="other")
  {

  }
}

handleChangeCourse = (course_details) => {
  this.setState({ course_details });

  if(course_details.value==="other")
  {
  }
}

handleChangeSpecializationsMajor = (specialization_major) => {
  this.setState({ specialization_major });
  let specializationMinor = [];
  this.state.specialization.map(val => {
    if(specialization_major.value !== val.value){
      specializationMinor.push(val);
    }
  });
  this.setState({specializationMinor , specialization_minor:null,minor_disable:false});
}

handleChangeSpecializationsMinor = (specialization_minor) => {
  this.setState({ specialization_minor });
}

handleChangeFromYear = (from_year) => {
  this.setState({ from_year });
}

handleChangeToYear = (to_year) => {
  this.setState({ to_year });
}

onChange(e){
  this.setState({[e.target.name]:e.target.value});
}

componentWillMount() {
  var searchParam = history.location.search;
  if (searchParam) {
    if(searchParam === '?status=logout'){
      Auth.logout(); // Setting the token in localStorage
      this.setState({loggedIn:false});
    }
  }else if(Auth.loggedIn()){
  this.setState({loggedIn:true});
  }

  setTimeout(function(){
    this.initStatePayment();
}.bind(this),1000);
}

  initStatePayment(){
    var searchParam = history.location.search;
    if(searchParam.split("=")[0] === '?uid'){
      this.setState({uid:searchParam.split("=")[1]})
     
      this.paymentInit(searchParam.split("=")[1])
    }
    if(searchParam.split("=")[0] === '?success'){
        let name = "";
        if(searchParam.split("=")[1] !== undefined && searchParam.split("=")[1] !== null){
            name = searchParam.split("=")[1].replace("_", " ")
        }
      this.setState({paySuccess:true,success_name:name});
    }
  }

  paymentInit(id){
    var that =this;
    Request.RequestHandle( "payment/student/?stu_id="+id,'GET',null,function(result) {
     
      if(result.status){
        that.setState({payUser:result.data,payModel:true});
      }
     
        });    
  }

initCourse(selectedCollegeOption){
  var that =this;
  Request.RequestHandle( "ccs/getall/course/"+selectedCollegeOption.value+"/courses",'GET',null,function(result) {
    if(result.status){
      that.setState({ 
        selectedCourseOption:{},
        specialization:[],
        major_disable:true,
        minor_disable:true,
        specialization_minor:null,
        specialization_major:null
      });
      that.setState({courseOption:[]});              
      var courseData =[];
          result.data.map(item => { 
            courseData.push({
              'label':item.name,
              'value':item._id,
              });
          });
          that.setState({courseData});
    }
   
      });
}

initCollege(){
  var that = this;
  Request.RequestHandle( "college/getall/full?search=a",'GET',null,function(result) {
      var collegeData =[];
      console.log(result)
      collegeData.push({'label':'Other','value':'other'});
          result.data.map(item => { 
            collegeData.push({
              'label':item.name,
              'value':item._id,
              });
          });
          that.setState({collegeData});
      });
}

Specialization(college_id,course_id){
  var that = this;
  Request.RequestHandle('ccs/college/'+college_id+'/course/'+course_id+'/specialization','GET', null,function(result){
    if(result.status){
      let specialization = [];
      result.data.results.map(value=>{
        specialization.push( { label: value.specializations_doc[0].name, value: value.specializations_doc[0]._id },);
      });
      that.setState({ specialization: specialization});
    }else{

    }
  }); 
}

get_college()
{
  Request.RequestHandle('college/getall/full','GET',null,function(result) {
    if(result.status){
    }else{
    
    }
    })





  try{
    let url1=BaseApi.base_url+'/college/getall/full'
      fetch(url1,{
        method:'GET',
        mode: 'cors',
        body:null

      })
        .then(res => res.json())
        .then(
          (tables) => {

          if(tables.data.length>0)
          {
            var array = [];
            var datas=tables.data;
            datas.forEach(function(item) {
              array.push({value:item._id,label:item.name});
            });

            array.push({value:"other",label:"Other"});

            this.setState({
              college: array,
              college_details:array[0]
              
            });

            this.get_course(array[0]); 
          }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
      }

      catch(error)
      {
      }
}

get_course(value)
{
  try{
    let url1=BaseApi.base_url+'/ccs/'+value+'/courses'
      fetch(url1,{
        method:'GET',
        mode: 'cors',
        body:null

      })
        .then(res => res.json())
        .then(
          (tables) => {
          if(tables.status)
          {
            var array = [];
            var datas=tables.data;
            datas.forEach(function(item) {
              array.push({value:item._id,label:item.name});
            });

            array.push({value:"other",label:"Other"});

            this.setState({
              course: array,
              course_details:array[0]
              
            });
          }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
      }

      catch(error)
      {
      }
}

handleSubmitEnrol(event) {
  event.preventDefault();
  // if( !this.ValidationForm()){
  //   return false;
  // }

  this.setState({
    isLoaded: true,
    formdata: event.target,
  });

  let college =null;
  if (this.state.selectedCollegeOption !== null){
    college = this.state.selectedCollegeOption.value;
  } 
  
  if(this.state.otherCollege){
     college ='other';
  }

  let course =null;
  if (this.state.selectedCourseOption !== null){
    course = this.state.selectedCourseOption.value;
  }

  let major =null;
  if (this.state.specialization_major !== null){
    major = this.state.specialization_major.value;
  }

  let minor =null;
  if (this.state.specialization_minor !== null){
    minor = this.state.specialization_minor.value;
  }

  let from_year =null;
  if (this.state.from_year !== null){
    from_year = this.state.from_year.value;
  }

  let to_year =null;
  if (this.state.to_year !== null){
    to_year = this.state.to_year.value;
  }

  const universityData ={
    fname : this.state.fname,
    lname : this.state.lname,
    email:this.state.email,
    contact_no:this.state.contact_no,
    college_id:college,
    course_id:course,
    specialization_id_minor:minor,
    specialization_id_major:major,
    academic_from:from_year,
    academic_to:to_year,
    college_name:this.state.college_name,
    college_contatc_no:this.state.college_contact,
    college_email:this.state.college_email,
  }

  let that = this;
  if(that.state.captch){
    
  Request.RequestHandle('students/enroll/new','POST',JSON.stringify(universityData),function(result) {
  if(result.status){
    that.onCloseModal();
      swal("Success!", "You have been enrolled into the system successfully. Please check your email for more details.", "success");
  }else{
    that.setState({
      alerttext: result.msg,
      visible: true,
    });
  }
  })

}else{
  that.setState({
                alerttext: 'Please check the Captcha Box',
                visible: true,
              });
}
  

}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onStudentLoginOpenModal = () => {
    this.setState({ studentLoginOpen: true });
  };

  onStudentOpenModal = () => {
    this.setState({ studentOpen: true });
    this.setState({ alerttext: "" , visible : false});
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.setState({ studentOpen: false });
    this.setState({ studentLoginOpen: false });
    this.setState({ openforget: false,paySuccess:false,payModel:false });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleChange1(e) {
  const re = /^[0-9\b]+$/;
  if (e.target.value === '' || re.test(e.target.value)) {
    this.setState({contact_no: e.target.value})
 }
}

handleSubmit(e) {
    e.preventDefault();
    const { username, password ,captch} = this.state;  


    this.setState({ submitted: true,restext:'Loading....' });
    if (username && password) {
     
      if (captch) {
        Auth.login(username,password,'employer/emp/login')
        .then(res =>{
          if (res.status) {
         window.location.replace(BaseApi.login_url+'/#/login?key='+res.data.loginToken);
          }else{
          this.setState({restext:"Incorrect Email or Password"});
          }
          // this.props.history.replace('http://localhost:3001/#/login?key='+res.data.loginToken);
          //this.setState({restext:'mail and password required'});

        })
        .catch(err =>{
          this.setState({restext:"Something's wrong. Please check your connection and try again"});
        })
      }else{
        this.setState({restext:"Please check the Captcha Box"});        
      }
     

    }else{
      this.setState({restext:'Email and Password are required'});
    }
};

ReCAPTCHAGGet(value) {
  const recaptchaValue = recaptchaRef.current.getValue();
  // this.props.onSubmit(recaptchaValue);
  this.setState({captch:true});
}


LogOut(){
  Auth.logout();
  this.setState({loggedIn:false});
    
}

ReCAPTCHAGError(error){
console.log(error);
}

StudentHandleSubmit(e){
  e.preventDefault();

  this.setState({ submitted: true,resstudenttext:'Loading....' });
  const { username, password ,captch} = this.state;  
 
  if (username && password) {
    if (captch) {
      Auth.login(username,password,'students/stu/login')
      .then(res =>{
        if (res.status) {
        window.location.replace(BaseApi.login_url+'/#/login?key='+res.data.loginToken);
        }else{
          
        this.setState({resstudenttext:"Incorrect Email or Password"});
        }
        // this.props.history.replace('http://localhost:3001/#/login?key='+res.data.loginToken);
        //this.setState({restext:'mail and password required'});

      })
      .catch(err =>{
        this.setState({resstudenttext:"Something's wrong. Please check your connection and try again"});
      })
    }else{
      this.setState({resstudenttext:"Please check the Captcha Box"});        
    }
   

  }else{
    this.setState({resstudenttext:'Email and Password are required'});
  }
}

otherCollege(){
  this.setState({otherCollege:true,selectedCollegeOption:{}})
}


  render() {
    const { username, password,college_details,course_details,college,course,alerttext,paySuccess,payModel,success_name } = this.state;
    const { open ,studentOpen, studentLoginOpen} = this.state;

    return (
      <div >

              <Modal open={paySuccess} onClose={this.onCloseModal} backdrop="static" classNames="modal-resp" closeOnOverlayClick={false} center>
                <CardGroup>
                <div className="row text-center">
                <div className="col-sm-6 col-sm-offset-3">
                  <h2 style={{ color: '#0fad00'}}>Success</h2>
                  <h3>Dear, {success_name}</h3>
                  <p style={{ fontsize:'20px',color:'#5c5c5c' }}>Thank you for your payment. You account has been activated successfully. Check your email for more details.</p>	
                  <a href onClick={this.onStudentLoginOpenModal} className="btn btn-primary  btn-lg">Login Now</a>
                </div>
              </div>
                </CardGroup>
                </Modal>


                <Modal open={payModel} onClose={this.onCloseModal} closeOnOverlayClick={false} center>
        <CardGroup>
        <div className="row text-center">
        <div className="col-sm-8 col-sm-offset-2">
          <h2 style={{ color: '#0fad00'}}>Welcome</h2>
          <h3>Dear, { this.state.payUser.name }</h3>
          <p style={{ fontsize:'20px',color:'#5c5c5c' }}>Thank you for enrolling Prime Careers. Click on the button below to settle the payment.</p>	
          <form className="text-left">
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-md-4 col-form-label">Email</label>
              <div className="col-sm-10 col-md-8">
                <p>{ this.state.payUser.email }</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-md-4 col-form-label">Phone Number</label>
              <div className="col-sm-10 col-md-8">
                <p>+91-{ this.state.payUser.contact_no }</p>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-md-4 col-form-label">Payment</label>
              <div className="col-sm-10 col-md-8">
                <p>INR { this.state.payUser.payment }.00</p>
              </div>
            </div>
          </form>
          <a type="button" href={BaseApi.base_url+"/payment?stu_id="+this.state.uid} className="btn btn-primary  btn-lg">Pay Now</a>
        </div>
      </div>
        </CardGroup>             
        </Modal>


<div className="top-wrapper grad fixed fixed-header" style={{height: '50px', marginTop: 0}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="top-social-network" style={{marginLeft: '-43px'}}>
                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                <li><a href="#"><i className="fa fa-instagram" /></a></li>
                <li><b style={{marginLeft: '20px'}}><a href="#">(+91)-9818787900</a></b></li>

                {this.state.loggedIn ? (
      <b style={{marginLeft: '20px'}}></b>
      ) : (
        <span>
        <b  style={{  marginLeft: '20px', color: "#fff"}}>
          <a href onClick={this.onStudentOpenModal}>Student Zone </a>
            <span style={{fontWeight: "normal"}}>
            (<a href onClick={this.onStudentLoginOpenModal}> Login </a>|<a href onClick={this.onStudentOpenModal}> Enroll </a>)
            </span>
        </b>
        </span>
      )}



              </ul>
            </div>
            <div className="col-md-6" style={{textAlign: 'right'}}>
            {this.state.loggedIn ? (
      <b style={{marginRight: '-74px'}}><a href onClick={this.LogOut}>Logout</a></b>
      ) : (
        <span>
       
        <b><a href onClick={this.onOpenModal}>Employer Zone </a>
        <span style={{fontWeight: "normal",color: "white"}}>
            (<a href onClick={this.onOpenModal}> Login </a>|<a href="#contact" > Register </a>)
        </span>
        </b>
        </span>
      )}

            </div>
          </div>
        </div>
      </div>
          
      

      <Modal open={studentLoginOpen} onClose={this.onCloseModal} closeOnOverlayClick={false} center >
         <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <Form onSubmit={this.StudentHandleSubmit}>
                      <h2>Student Login</h2>
                      <p className="text-muted" >{this.state.resstudenttext}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Email
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" className="narrow-input" placeholder="Email" autoComplete="username" name="username" value={username} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Password
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" className="narrow-input" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4" style={{textAlign: "center", marginBottom: "20px"}}>
                      {/* <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={BaseApi.captcha_key}
                          onChange={this.ReCAPTCHAGGet}
                          onErrored = {this.ReCAPTCHAGError}
                        /> */}
                      </InputGroup>
                      <InputGroup className="mb-4">
                      <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right href-over"  style={style} onClick={() => { this.ForgetPassword('student') }}>
                          Forgot password?
                        </Col>
                      </InputGroup>
                    
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
        </Modal>

         <Modal open={open} onClose={this.onCloseModal} closeOnOverlayClick={false} center>
         <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h2>Employer Login</h2>
                      <p className="text-muted" >{this.state.restext}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Email
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" className="narrow-input" placeholder="Email" autoComplete="username" name="username" value={username} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Password
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" className="narrow-input" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4" style={{textAlign: "center", marginBottom: "20px"}}>
                      {/* <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={BaseApi.captcha_key}
                          onChange={this.ReCAPTCHAGGet}
                        /> */}
                      </InputGroup>
                      <InputGroup className="mb-4">
                      <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right href-over"  style={style} onClick={() => { this.ForgetPassword('employer') }}>
                          Forgot password?
                        </Col>
                      </InputGroup>
                    
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
        </Modal>
        <Modal open={studentOpen} onClose={this.onCloseModal} backdrop="static" classNames="modal-resp" closeOnOverlayClick={false} center>
         <CardGroup>
         <Card className="mx-4">
                <CardBody>
                <Form onSubmit={this.handleSubmitEnrol} encType="multipart/form-data">
                    <h2>Student Enrollment</h2>
                    <p className="text-muted" >{this.state.alerttext}</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        First Name
                      </InputGroupAddon>
                      
                      <Input type="text" name="fname" className="narrow-input" placeholder="First Name"  onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Last Name
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="lname" className="narrow-input" placeholder="Last Name"  onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Email
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" className="narrow-input" placeholder="Email" autoComplete="email" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Contact
                        </InputGroupText>
                      </InputGroupAddon>

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{width:"50px",backgroundColor:"white"}} className="narrow-input">
                          +91
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                       name="contact_no" 
                       className="narrow-input is-invalid"
                       placeholder="Contact Number" 
                       required
                       maxLength={10}
                       onInput={this.handleChange1.bind(this)}
                       value={this.state.contact_no}/>
                     </InputGroup>


                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College
                        </InputGroupText>
                      </InputGroupAddon>
                      <Select
                        styles={selectStyles}
                        className="select-input" 
                        placeholder={"Search and Select"}
                        value={this.state.selectedCollegeOption}
                        onChange={this.onChangeSelectCollegeOption}
                        onInputChange ={this.changeCollege}
                        options={this.state.collegeData}
                        isSearchable
                      />
                    </InputGroup>
                    <InputGroup className="mb-3 right-link">
                    <a href onClick={this.otherCollege} className="left-a" >College not in list?</a>
                    </InputGroup>
                    {this.state.otherCollege ===true ?
                    <div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College Name
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="college_name" className="narrow-input" placeholder="College Name" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College Contact
                        </InputGroupText>
                      </InputGroupAddon>

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{width:"50px",backgroundColor:"white"}} className="narrow-input">
                          +91
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" name="college_contact" className="narrow-input" placeholder="College Contact Number" maxlength="10" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College Email
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="college_email" className="narrow-input" placeholder="College Email" autoComplete="email" onChange ={this.onChange} />
                    </InputGroup>
                    </div>
                    :
                    <div>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Course
                        </InputGroupText>
                      </InputGroupAddon>
                        <Select
                         className="select-input" 
                        placeholder={"Search and Select"}
                        value={this.state.selectedCourseOption}
                        onChange={this.onChangeSelectCourseOption}
                        onInputChange ={this.changeCourse}
                        options={this.state.courseData}
                        isSearchable
                        isDisabled ={this.state.course_disable}
                      />
                    </InputGroup>
                   
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText >
                        Major
                        </InputGroupText>
                      </InputGroupAddon>
                      <Select 
                          className="select-input" 
                      value={this.state.specialization_major}
                      options={ this.state.specialization } 
                      onChange={this.handleChangeSpecializationsMajor } 
                      isDisabled={this.state.major_disable} 
                      placeholder={"Search and Select"}
                      isSearchable />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        Minor
                        </InputGroupText>
                      </InputGroupAddon>
                      <Select 
                         className="select-input" 
                      isDisabled={this.state.minor_disable} 
                      value={this.state.specialization_minor}
                      options={ this.state.specializationMinor } 
                      onChange={this.handleChangeSpecializationsMinor} 
                      placeholder={"Search and Select"}
                      isSearchable  />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        Academic Year
                        </InputGroupText>
                      </InputGroupAddon>
                      <Select 
                         className="select-input" 

                      value={this.state.from_year}
                      options={ [
                                {'label':2019,'value':2019,},
                                {'label':2018,'value':2018,},
                                {'label':2017,'value':2017,},
                                {'label':2016,'value':2016,},
                                {'label':2015,'value':2015,},
                                {'label':2014,'value':2014,},
                                ]} 
                      onChange={this.handleChangeFromYear } 
                      // isDisabled={this.state.major_disable} 
                      placeholder={"From"}
                      isSearchable />
                      <InputGroupAddon addonType="prepend" className="arrow-mark">
                        <InputGroupText className="input-group-arrow" >
                          -
                        </InputGroupText>
                      </InputGroupAddon>
                      <Select 
                         className="select-input" 

                      value={this.state.to_year}
                      options={
                                [
                                {'label':2021,'value':2021,},
                                {'label':2020,'value':2020,},
                                {'label':2019,'value':2019,},
                                ]
                                }
                      onChange={this.handleChangeToYear } 
                      // isDisabled={this.state.major_disable} 
                      placeholder={"To"}
                      isSearchable />
                    </InputGroup>
                    </div>
                     }
                    <InputGroup className="" style={{ textAlign: "center", marginBottom: "20px"}}>
                    {/* <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={BaseApi.captcha_key}
                        onChange={this.ReCAPTCHAGGet}
                      /> */}
                    </InputGroup>

                    <Button className="btn btn-success" style={{background: "#4dbd74"}} block>Enroll</Button>
                    <a className="student-login" style={{display: "none"}}>Already Registered User? Click here to login</a>

                  </Form>
                </CardBody>
                
              </Card>
              </CardGroup>
        </Modal>

        <Modal open={this.state.openforget} onClose={this.onCloseModal} closeOnOverlayClick={false} center>
         <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <Form onSubmit={this.handleSubmitResetPassword}>
                      <h2>Forgot password</h2>
                      <p className="text-muted" >{this.state.resetPassrestext}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Email
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" className="narrow-input" placeholder="Email" autoComplete="email" name="forgetEmail" value={this.state.forgetEmail} onChange={this.handleChange} />
                      </InputGroup>
                     
                      <InputGroup className="mb-4">
                      <Col xs="12">
                          <Button color="primary" className="px-4">Submit</Button>
                        </Col>
                       
                      </InputGroup>
                    
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
        </Modal>


        
      
        <div className="fab">
  <span className="fab-action-button">
        <i className="fab-action-button__icon"></i>
    </span>
  <ul className="fab-buttons">
    <li className="fab-buttons__item">
      <a href onClick={this.onOpenModal} className="fab-buttons__link" data-tooltip="Employer Zone">
        <i className="icon-material icon-material_tw"></i>
      </a>
    </li>
    <li className="fab-buttons__item">
      <a href onClick={this.onStudentOpenModal} className="fab-buttons__link" data-tooltip="Student Enrollment">
        <i className="icon-material icon-material_li"></i>
      </a>
    </li>
    <li className="fab-buttons__item">
      <a href onClick={this.onStudentLoginOpenModal} className="fab-buttons__link" data-tooltip="Student Zone">
        <i className="icon-material icon-material_gp"></i>
      </a>
    </li>
  </ul>
</div>


      </div>
    );
  }
}

export default App;