import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Alert,Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import './App.css';
import Modal from 'react-responsive-modal';
import ReCAPTCHA from "react-google-recaptcha";
import AuthService from './components/AuthService';
import swal from 'sweetalert';
import Select from 'react-select';
import BaseApi from './components/BaseApi';
import createHistory from 'history/createBrowserHistory'
import RequestHandle from "./components/RequestHandle";
const Request = new RequestHandle();

const history = createHistory()
const Auth = new AuthService();
const recaptchaRef = React.createRef();


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
        studentLoginOpen: false,
        studentOpen: false,
        submitted: false,
        captch:false,
        restext:'Sign In to your account',
        college_details: {},
        course_details:{},
        college:[],
        course:[], 
        resstudenttext:'',
        visible: false,
        alerttext:'',
        loggedIn:false,
        specialization_minor:{},
        specialization_major:{},
        specialization:[]
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
    
}

onDismiss() {
  this.setState({ visible: false });
}

handleChangeCollege = (college_details) => {
  this.setState({ college_details });
  console.log(`Option selected:`, college_details.value);
  this.get_course(college_details.value); 

  if(college_details.value==="other")
  {
    console.log("mano")
  }
}

handleChangeCourse = (course_details) => {
  this.setState({ course_details });
  console.log(`Option selected:`, course_details);

  if(course_details.value==="other")
  {
    console.log("mano")
  }
}

handleChangeSpecializationsMajor = (specialization_major) => {
  this.setState({ specialization_major });
}

handleChangeSpecializationsMinor = (specialization_minor) => {
  this.setState({ specialization_minor });
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

  this.get_college();
 
  this.Specialization();

}

Specialization(){
  var that = this;
  Request.RequestHandle('specializations/getall/specalization','GET', null,function(result){
    console.log('====================================');
console.log(result);
console.log('====================================');
    if(result.status){
      let specialization = [];
      result.data.results.map(value=>{
        specialization.push( { label: value.name, value: value._id },);
      });
      that.setState({ specialization: specialization});
    }else{

    }
  }); 
}

get_college()
{
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
        console.log(error);
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
            console.log('====================================');
            console.log('tables',tables);
            console.log('====================================');
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
        console.log(error);
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

  const universityData ={
    fname : this.state.fname,
    lname : this.state.lname,
    email:this.state.email,
    contact_no:this.state.contact_no,
    college_id:this.state.college_details.value,
    course_id:this.state.course_details.value,
    specialization_id_minor:this.state.specialization_minor.value,
    specialization_id_major:this.state.specialization_major.value
  }

  let that = this;
  if(this.state.captch){
  Request.RequestHandle('students/enroll/new','POST',JSON.stringify(universityData),function(result) {
  if(result.status){
        this.onCloseModal();
      swal("Success!", "You have been enrolled into the system successfully. Please check your email for more details.", "success");
  }else{
    that.setState({
      alerttext: result.msg,
      visible: true,
    });
  }
  })
}else{
  this.setState({
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
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}
  
handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true,restext:'Loading....' });
    const { username, password ,captch} = this.state;  
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
          console.log(err);
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
  console.log("Captcha value:", recaptchaValue);
  this.setState({captch:true});
}


LogOut(){
  Auth.logout();
  this.setState({loggedIn:false});
    
}

StudentHandleSubmit(e){
  e.preventDefault();

  this.setState({ submitted: true,resstudenttext:'Loading....' });
  const { username, password ,captch} = this.state;  
  if (username && password) {
    if (captch) {
      Auth.login(username,password,'students/stu/login')
      .then(res =>{
        console.log(res);
        if (res.status) {
        window.location.replace(BaseApi.login_url+'/#/login?key='+res.data.loginToken);
        }else{
          
        this.setState({resstudenttext:"Incorrect Email or Password"});
        }
        // this.props.history.replace('http://localhost:3001/#/login?key='+res.data.loginToken);
        //this.setState({restext:'mail and password required'});

      })
      .catch(err =>{
        console.log(err);
        this.setState({resstudenttext:"Something's wrong. Please check your connection and try again"});
      })
    }else{
      this.setState({resstudenttext:"Please check the Captcha Box"});        
    }
   

  }else{
    this.setState({resstudenttext:'Email and Password are required'});
  }
}

  render() {
    const { username, password,college_details,course_details,college,course,alerttext } = this.state;
    const { open ,studentOpen, studentLoginOpen} = this.state;

    let disabled = true;
    if(this.state.college_details !== null){
      disabled  = false;
    }
    
    return (
      <div >
      {this.state.loggedIn ? (
      <b style={{marginLeft: '20px'}}><a onClick={this.LogOut}>Logout</a></b>
      ) : (
        <span>
        <b style={{marginLeft: '20px', color: "#fff"}}>
          <a  onClick={this.onStudentOpenModal}>Student Zone </a>
            <span style={{fontWeight: "normal"}}>
            (
              <a onClick={this.onStudentLoginOpenModal}> Login </a>
              | 
              <a  onClick={this.onStudentOpenModal}> Enroll </a>
            )
            </span>
        </b>
        
        <b style={{marginLeft: '20px'}}><a onClick={this.onOpenModal}>Employer Zone</a></b>
        </span>
      )}

     
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
                      <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={BaseApi.captcha_key}
                          onChange={this.ReCAPTCHAGGet}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                      <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
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
                      <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={BaseApi.captcha_key}
                          onChange={this.ReCAPTCHAGGet}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                      <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          Forgot password?
                        </Col>
                      </InputGroup>
                    
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
        </Modal>
        <Modal open={studentOpen} onClose={this.onCloseModal} backdrop="static" closeOnOverlayClick={false} center>
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
                      <Input type="tel" maxLength={10} name="contact_no" className="narrow-input" placeholder="Contact Number"  onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College
                        </InputGroupText>
                      </InputGroupAddon>
                        <div style={{width:"270px"}}>
                            <Select
                              value={college_details}
                              onChange={this.handleChangeCollege}
                              options={college}
                            />
                        </div>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Course
                        </InputGroupText>
                      </InputGroupAddon>
                        <div style={{width:"270px"}}>
                            <Select
                              value={course_details}
                              onChange={this.handleChangeCourse}
                              options={course}
                              isDisabled = {disabled}
                            />
                        </div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        Minor
                        </InputGroupText>
                      </InputGroupAddon>
                      <div style={{width:"270px"}}>
                      <Select options={ this.state.specialization } onChange={this.handleChangeSpecializationsMinor} isSearchable  />
                        </div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText >
                        Major
                        </InputGroupText>
                      </InputGroupAddon>
                      <div style={{width:"270px"}}>
                      <Select options={ this.state.specialization } onChange={this.handleChangeSpecializationsMajor } isSearchable />
                        </div>
                    </InputGroup>

                    <InputGroup className="" style={{textAlign: "center", marginBottom: "20px"}}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={BaseApi.captcha_key}
                        onChange={this.ReCAPTCHAGGet}
                      />
                    </InputGroup>

                    <Button className="btn btn-success" style={{background: "#4dbd74"}} block>Enroll</Button>
                    <a className="student-login" style={{display: "none"}}>Already Registered User? Click here to login</a>

                  </Form>
                </CardBody>
                
              </Card>
              </CardGroup>
        </Modal>
      </div>
    );
  }
}

export default App;