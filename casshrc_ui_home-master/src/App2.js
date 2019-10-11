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

let style ={
  cursor:'pointer'
}

class App2 extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        open: false,
        studentLoginOpen: false,
        studentOpen: false,
        submitted: false,
        captch:true,
        restext:'Sign In to your account',
        college_details: null,
        course_details:null,
        college:[],
        course:[], 
        resstudenttext:'',
        visible: false,
        alerttext:'',
        loggedIn:false,
        forgetEmail:null,
        resetPassrestext:'',
        selectedResetRole:'',
        message:'',
        name:'',
        email:'',
        msgError:'',
        student:null,
        vacancy:null,
        employer:null,
        vacancy_number:null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);
    this.onChange = this.onChange.bind(this); 
    this.onDismiss = this.onDismiss.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmitResetPassword = this.handleSubmitResetPassword.bind(this);
    this.ForgetPassword = this.ForgetPassword.bind(this);
    this.MsgSubmit = this.MsgSubmit.bind(this);
    this.countRequests = this.countRequests.bind(this);
    
}

onDismiss() {
  this.setState({ visible: false });
}



onChange(e){
  this.setState({[e.target.name]:e.target.value});
}

componentWillMount() {
this.countRequests();
  var searchParam = history.location.search;
  if (searchParam) {
    if(searchParam === '?status=logout'){
      Auth.logout(); // Setting the token in localStorage
      this.setState({loggedIn:false});
    }
  }else if(Auth.loggedIn()){
  this.setState({loggedIn:true});
  }
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
    this.setState({ openforget: false });

  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

countRequests(){
  var that  =this;

  Request.RequestHandle('main_page/count','GET',null,function(result) {
    if(result.status){
      that.setState({
        vacancy: result.data.vacancy,
        employer: result.data.employer,
        student: result.data.student,
        vacancy_number: result.data.vacancy_number,
      });
    }
    })
}

MsgSubmit(e){
  e.preventDefault();

  if(!this.state.captch){
    this.setState({
      msgError: 'Please check the Captcha Box',
    });

    return false;
  }

  let universityData={
    name:this.state.name,
    email:this.state.email,
    message:this.state.message
  }

  var that  =this;
  Request.RequestHandle('main_page/contact_us','POST',JSON.stringify(universityData),function(result) {
    if(result.status){
        swal("Query sent successfully!", "Thank you for your query. We will get back you soon", "success");
        that.setState({
          name:'',
          email:'',
          message:''
        });
    }else{
      that.setState({
        msgError: result.msg,
      });
    }
    })
}
  
handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true,restext:'Loading....' });
    const { username, password ,captch} = this.state;  
    if (username && password) {
      if (captch) {
        Auth.login(username,password,'users/login')
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



  render() {
    const { username, password,college_details,course_details,college,course,alerttext } = this.state;
    const { open ,studentOpen, studentLoginOpen} = this.state;
    
    return (
      <div >

<div className="parallax padding-bot30" id="why-us-section" data-background="img/parallax/bg06.jpg" data-speed="0.2" data-size="50%">
        <div className="overlay" />
        <div className="container">
          <div className="content-parallax">
            <div className="row count">
              <div className="col-md-12 owl-column-wrapp">
                <div className="recent-4column owl-carousel owl-theme">
                  {/* Start counter 1 */}
                  <div className="item">
                    <div className="counter-circle mandy-border">
                      <i className="fa fa-users icon-circle fa-3x icon-mandy" />
                      <div className="count-value" data-count={this.state.employer}><span className="start-count">{this.state.employer}</span></div>
                      <p>Employers</p>
                    </div>
                  </div>
                  {/* End counter 1 */}
                  {/* Start counter 2 */}
                  <div className="item">
                    <div className="counter-circle buttercup-border">
                      <i className="fa fa-user icon-circle fa-3x icon-buttercup" />
                      <div className="count-value" data-count={this.state.student}><span className="start-count">{this.state.student}</span></div>
                      <p>Job Seekers</p>
                    </div>
                  </div>
                  {/* End counter 2 */}
                  {/* Start counter 3 */}
                  <div className="item">
                    <div className="counter-circle picton-border">
                      <i className="fa fa-thumbs-up icon-circle fa-3x icon-picton" />
                      <div className="count-value" data-count={this.state.vacancy}><span className="start-count">{this.state.vacancy}</span></div>
                      <p>Jobs</p>
                    </div>
                  </div>
                  {/* End counter 3 */}
                  {/* Start counter 4 */}
                  <div className="item">
                    <div className="counter-circle meadow-border">
                      <i className="fa fa-share-alt icon-circle fa-3x icon-meadow" />
                      <div className="count-value" data-count={this.state.vacancy_number}><span className="start-count">{this.state.vacancy_number}</span></div>
                      <p>Vacancies</p>
                    </div>
                  </div>
                  {/* End counter 4 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="contain-wrapp padding-top50 padding-bot40" id="contact" style={{paddingTop: '150px', marginTop: '-150px'}}>
        <div className="container">
          <div className="row marginbot10">
            <div className="col-md-9 col-sm-12">
              <div className="section-heading text-left" style={{marginTop: '40px'}}>
                <h5>Get in touch with us</h5>
              </div>
            </div>
          </div>
          <p className="text-muted" >{this.state.msgError}</p>
          <div className="row">
            <div className="col-md-9 col-sm-12">
              {/* Start Form */}
              <form method="post" onSubmit={this.MsgSubmit}>
                <div className="clearfix" />
                <div id="success" />
                <div className="row wrap-form">
                  <div className="form-group col-md-6 col-sm-12">
                    <h6>Full Name <span className="primary">*</span></h6>
                    <input type="text" name="name" id="name" className="form-control input-lg required" placeholder="Enter your full Name..."  value={this.state.name} onChange={this.handleChange} />
                    <span data-for="name" className="error" />
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <h6>Email Address <span className="primary">*</span></h6>
                    <input type="email" name="email" id="email" className="form-control input-lg required" placeholder="Enter your email address..." value={this.state.email} onChange={this.handleChange} />
                    <span data-for="email" className="error" />
                  </div>
                  <div className="form-group col-md-12 col-sm-12">
                    <h6>Your Query <span className="primary">*</span></h6>
                    <textarea name="message" id="message" className="form-control input-lg required" placeholder="Type your message here" rows={9} defaultValue={""} value={this.state.message} onChange={this.handleChange}  />
                    <span data-for="message" className="error" />
                  </div>
                  <div className="form-group col-md-12 margintop15 col-sm-12">
                  {/* <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={BaseApi.captcha_key}
                          onChange={this.ReCAPTCHAGGet}
                        /> */}
                  </div>
                  <div className="form-group col-md-12 margintop15 col-sm-12">
                    <input type="submit" defaultValue="Send Message" id="submit" className="btn btn-primary btn-lg btn100" />
                    <div className="status-progress" />
                  </div>
                 
                </div>
              </form>
              {/* End Form */}
            </div>
            <div className="col-md-3 col-sm-5">
              <div className="contact-detail">
                <ul className="list-unstyled">
                  <li>
                    <div className="abslute-icon ai-2x">
                      <i className="fa fa-map icon-circle icon-primary fa-2x" /> 
                      <h6>Our location</h6>
                      <p>
                        A-403, Somdutt Chambers-1,<br />
                        5, Bhikaji Cama Place,<br />
                        New Delhi - 110066
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="abslute-icon ai-2x">
                      <i className="fa fa-phone icon-circle icon-primary fa-2x" /> 
                      <h6>Call center</h6>
                      <p>
                      (+91)-9818787900
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="abslute-icon ai-2x">
                      <i className="fa fa-envelope icon-circle icon-primary fa-2x" /> 
                      <h6>Email address</h6>
                      <p className="contact_ali">
                        alliances@primecareers.co.in
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>	
          </div>			
        </div>
      </div>



      <footer style={{paddingTop: '0px', marginTop: '-20px'}}>
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                {this.state.loggedIn ? (
                  <p>2019 © Copyright <a href >PRIME CAREERS.</a> </p>
                ):(
                  <p>2019 © Copyright <a href >PRIME CAREERS.</a><a href className="admin_zone"  onClick={this.onOpenModal}>Admin Zone</a></p>
                )}
              </div>
              <div className="col-md-6" style={{textAlign: 'right'}}>
                Developed by <a href="http://filoi.in" target="_blank">Filoi</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

     
         <Modal open={open} onClose={this.onCloseModal} closeOnOverlayClick={false} center>
         <CardGroup>
                <Card className="p-6">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h2>Admin Login</h2>
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
                        <Col xs="6" className="text-right href-over" style={style} onClick={() => { this.ForgetPassword('admin') }}>
                          Forgot password?
                        </Col>
                      </InputGroup>
                    
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
      </div>
    );
  }
}

export default App2;