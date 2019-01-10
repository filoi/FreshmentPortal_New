import React, { Component } from 'react'
import './css/revolution/layers.css'
import './css/revolution/navigation.css'
import './css/style.css'
import './skins/default.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Alert,Button, Card, CardBody, CardGroup, Col, CardFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
 import AuthService from '../../components/AuthService';
 import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import swal from 'sweetalert';
const recaptchaRef = React.createRef();

 const Auth = new AuthService();

export default class componentName extends Component {

  
      
      constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            open: false,
            studentOpen: false,
            submitted: false,
            captch:false,
            restext:'Sign In to your account',
            college_details: null,
            course_details:null,
            college:[],
            course:[], 
            visible: false,
            alerttext:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);
        this.onChange = this.onChange.bind(this); 
        this.handleSubmitEnrol = this.handleSubmitEnrol.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

    }

    onDismiss() {
      this.setState({ visible: false });
    }

    handleChangeCollege = (college_details) => {
      this.setState({ college_details });
      console.log(`Option selected:`, college_details.value);
  
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

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }

    componentDidMount() {

      this.get_college();
      this.get_course(); 
  
    }
  
    get_college()
    {
      try{
        let url1='http://139.59.73.212:5000/api/college/getall/full'
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
  
    get_course()
    {
      try{
        let url1='http://139.59.73.212:5000/api/course/getall/full'
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
      }
  
      var formBody = [];
      for (var property in universityData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(universityData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
  
      console.log('====================================');
      console.log(formBody);
      console.log('====================================');
      fetch("http://139.59.73.212:5000/api/students/enroll/new", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody,
          
      }).then(response =>response.json())
        .then((result) => {
          console.log('====================================');
      console.log(JSON.stringify(result));
      console.log('====================================');
          this.setState({
            isLoaded: false,
          });
          if(result.status){
            swal({
              title: "Success",
              text: "You have been enrolled into the system successfully. Please check your email for more details.",
              icon: "success",
              buttons: {
                catch: {
                  text: "Continue",
                  value: "catch",
                },
              },
            }).then((value) => {
              switch (value) {
                case "catch":
          window.location.assign("http://localhost/Filoi%20Job%20Portal/Job%20Portal/");
                  break;
    
                  default:
                  
                  this.state.formdata.reset();
              }
            }); 
          }else{
  
            this.setState({
              alerttext: result.msg,
              visible: true,
            });
  
          }
      },
      (error) =>  {  console.log(error)}
    )
    .catch(err => console.log(err));
    }

      onOpenModal = () => {
        this.setState({ open: true });
      };

      onStudentOpenModal = () => {
        this.setState({ studentOpen: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
        this.setState({ studentOpen: false });
      };

      handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
      
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true,restext:'Loading....' });
        const { username, password ,captch} = this.state;  
        if (username && password && captch) {
          Auth.login(username,password)
            .then(res =>{
              console.log(res);
               this.props.history.replace('/');
      this.setState({restext:'mail and password required'});

            })
            .catch(err =>{
                alert(err);
            })
        }else{
         
      this.setState({restext:'mail and password required'});

        }
    };

    ReCAPTCHAGGet(value) {
      const recaptchaValue = recaptchaRef.current.getValue();
      // this.props.onSubmit(recaptchaValue);
      console.log("Captcha value:", recaptchaValue);
      this.setState({captch:true});
    }


    loginModel(){
        
    }


  render() {
    const { username, password,college_details,course_details,college,course,alerttext } = this.state;
    const { open ,studentOpen} = this.state;
    return (
        <div className="body-layer">
         <Modal open={open} onClose={this.onCloseModal} center>
         <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h2>Login</h2>
                      <p className="text-muted" >{this.state.restext}</p>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Email
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" className="narrow-input" placeholder="Username" autoComplete="username" name="username" value={username} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            Password
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" className="narrow-input" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="" style={{textAlign: "center", marginBottom: "20px"}}>
                      <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey="6LeMt4cUAAAAAJM5mRItOigf3R_UGFPbjdlTG0uc"
                          onChange={this.ReCAPTCHAGGet}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          Forgot password?
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
        </Modal>
        <Modal open={studentOpen} onClose={this.onCloseModal} center>
         <CardGroup>
         <Card className="mx-4">
                <CardBody>
                <Form onSubmit={this.handleSubmitEnrol} encType="multipart/form-data">
                    <h2>Student Enrollment</h2>
                    <p className="text-muted"></p>
                    
                    <Alert className="alert alert-danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {alerttext}
                    </Alert>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        First Name
                      </InputGroupAddon>
                      <Input type="text" name="fname" className="narrow-input" placeholder="First Name" autoComplete="email" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Last Name
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="lname" className="narrow-input" placeholder="Last Name" autoComplete="new-password" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Email
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" className="narrow-input" placeholder="Email" autoComplete="new-password" onChange ={this.onChange} />
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
                      <Input type="text" name="contact_no" className="narrow-input" placeholder="Contact Number" autoComplete="new-password" onChange ={this.onChange} />
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
                            />
                        </div>
                    </InputGroup>

                    <InputGroup className="" style={{textAlign: "center", marginBottom: "20px"}}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeMt4cUAAAAAJM5mRItOigf3R_UGFPbjdlTG0uc"
                        onChange={this.ReCAPTCHAGGet}
                      />
                    </InputGroup>

                    <Button className="btn btn-success" style={{background: "#4dbd74"}} block>Enroll</Button>
                  </Form>
                </CardBody>
                
              </Card>
              </CardGroup>
        </Modal>
          {/* Start preloading */}
          <div id="loading" className="loading-invisible">
            <div className="loading-center">
              <div className="loading-center-absolute">
                <div className="object" id="object_one" />
                <div className="object" id="object_two" />
                <div className="object" id="object_three" />
              </div>
              <p>Please wait...</p>
            </div>
          </div>
          {/* End preloading */}
          {/* Start top section */}
          <div className="top-wrapper grad">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <ul className="top-social-network">
                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                    <li><a href="#"><i className="fa fa-instagram" /></a></li>
                    <li><b style={{marginLeft: '20px'}}><a href="#">+91 7785692463</a></b></li>
                  </ul>
                </div>
                <div className="col-md-6" style={{textAlign: 'right'}}>
                  <b style={{marginLeft: '20px'}}><a  onClick={this.onStudentOpenModal} >Student Zone</a></b>
                  <b style={{marginLeft: '20px'}}><a onClick={this.onOpenModal}>Employer Zone</a></b>
                </div>
              </div>
            </div>
          </div>
          {/* End top section */}
          <div className="clearfix" />
          {/* Start Navigation */}
          <nav className="navbar navbar-sticky bootsnav">
            {/* Start Top Search */}
            <div className="top-search">
              <div className="container">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-search" /></span>
                  <input type="text" className="form-control" placeholder="Type something ann hit enter" />
                  <span className="input-group-addon close-search"><i className="fa fa-times" /></span>
                </div>
              </div>
            </div>
            {/* End Top Search */}
            <div className="container">   
              {/* Start Header Navigation */}
              <div className="navbar-header">
                <button style={{display: 'none'}} type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i className="fa fa-bars" />
                </button>
                <a className="navbar-brand" href="#brand"><img src="../../assets/img/logo-text.png" className="logo" style={{background: '#fff', borderRadius: '10px', width: '200px', marginTop: '-2px'}} /></a>
              </div>
              {/* End Header Navigation */}
              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="" id="navbar-menu">
                <ul className="nav navbar-nav navbar-right" style={{flexDirection: "unset"}}>
                  <li className="active"><a href="index.html">Home</a></li>
                  <li className="dropdown">
                    <a href="about.html">About</a>
                  </li>
                  <li className="dropdown">
                    <a href="whyus.html">Why us?</a>
                  </li>
                  <li className="dropdown">
                    <a href="contact.html">Contact us</a>
                  </li>
                </ul>
              </div>{/* /.navbar-collapse */}
            </div>   
          </nav>
          {/* End Navigation */}
          {/* START REVOLUTION SLIDER 5.0 */}
          <Carousel showArrows={true} showIndicators={false} showThumbs={false}>
                <div>
                    <img src= {"../../assets/img/avatars/slide12.jpg"} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                <img src= {"../../assets/img/avatars/slide12.jpg"} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                <img src= {"../../assets/img/avatars/slide12.jpg"} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
          {/* END OF SLIDER WRAPPER */}
          {/* Start contain wrapp */}
          <div className="contain-wrapp paddingbot-clear" style={{background: "#fff", paddingBottom: "40px"}}>
            <div className="container">
              <div className="row marginbot70">
                <div className="col-md-12 text-center">
                  <div className="section-heading text-center">
                    <h5>About us</h5>
                  </div>
                  <p>
                    Per in purto noster officiis, ferri accusam detraxit no duo, vidit vivendum sit ea. Ex pro regione tibique. Sed ea porro explicari, noster pertinacia eu eum. Usu in ullum omnesque atomorum, pro integre imperdiet in. Saperet perpetua ut mei, nibh sale meis eam cu. Ut vim modus zril, ex cum erat dictas urbanitas 
                  </p>
                </div>
				
              </div>
            </div>
          </div>
		  
		  <img src= {"../../assets/img/avatars/ststs.jpg"} style={{width: "100%"}}/>
		  <img src= {"../../assets/img/avatars/quote.jpg"} style={{width: "100%"}}/>
		  
          
          {/* Start contain wrapp */}
          <div className="cta-wrapp">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <h4>Go to premium accoun today, and get discount 50%</h4>
                  <p>An iusto disputando delicatissimi sed, duo dolor suavitate voluptaria ex.</p>
                </div>
                <div className="col-md-4">
                  <a className="btn btn-primary btn-lg btn-3d btn-icon icon-divider" href="#"><i className="fa fa-rocket" />Enroll Now</a>
                </div>
              </div>
            </div>
          </div>
          {/* End contain wrapp */}
          {/* Start footer */}
          <footer style={{paddingTop: '0px', marginTop: '-20px'}}>
            <div className="subfooter">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <p>2019 © Copyright <a href="#">CAS.</a></p>
                  </div>
                  <div className="col-md-6" style={{textAlign: 'right'}}>
                    Developed by <a href="http://filoi.in" target="_blank">Filoi</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
  }
}