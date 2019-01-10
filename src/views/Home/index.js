import React, { Component } from 'react'
import './css/revolution/layers.css'
import './css/revolution/navigation.css'
import './css/style.css'
import './skins/default.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button, Card, CardBody, CardGroup, Col, CardFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
 import AuthService from '../../components/AuthService';
 import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
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
            restext:'Sign In to your account'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);

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
    const { username, password } = this.state;
    const { open ,studentOpen} = this.state;
    return (
        <div className="body-layer">
         <Modal open={open} onClose={this.onCloseModal} center>
         <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted" >{this.state.restext}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username" value={username} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange} />
                      </InputGroup>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeMt4cUAAAAAJM5mRItOigf3R_UGFPbjdlTG0uc"
                        onChange={this.ReCAPTCHAGGet}
                      />
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
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
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
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
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i className="fa fa-bars" />
                </button>
                <a className="navbar-brand" href="#brand"><img src="img/brand/logo-white.png" className="logo" alt style={{background: '#fff', borderRadius: '10px', width: '200px', marginTop: '-2px'}} /></a>
              </div>
              {/* End Header Navigation */}
              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse" id="navbar-menu">
                <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
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
          <Carousel>
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
          <div className="contain-wrapp paddingbot-clear">
            <div className="container">
              <div className="row marginbot50">
                <div className="col-md-8 col-md-offset-2 text-center">
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
          {/* End contain wrapp */}
          {/* Start parallax */}
          <div className="parallax padding-bot30" data-background="img/parallax/bg06.jpg" data-speed="0.2" data-size="50%">
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
                          <div className="count-value" data-count={402}><span className="start-count">0</span></div>
                          <p>Employers</p>
                        </div>
                      </div>
                      {/* End counter 1 */}
                      {/* Start counter 2 */}
                      <div className="item">
                        <div className="counter-circle buttercup-border">
                          <i className="fa fa-user icon-circle fa-3x icon-buttercup" />
                          <div className="count-value" data-count={6870}><span className="start-count">0</span></div>
                          <p>Job Seekers</p>
                        </div>
                      </div>
                      {/* End counter 2 */}
                      {/* Start counter 3 */}
                      <div className="item">
                        <div className="counter-circle picton-border">
                          <i className="fa fa-thumbs-up icon-circle fa-3x icon-picton" />
                          <div className="count-value" data-count={4678}><span className="start-count">0</span></div>
                          <p>Vacancies</p>
                        </div>
                      </div>
                      {/* End counter 3 */}
                      {/* Start counter 4 */}
                      <div className="item">
                        <div className="counter-circle meadow-border">
                          <i className="fa fa-share-alt icon-circle fa-3x icon-meadow" />
                          <div className="count-value" data-count={114}><span className="start-count">0</span></div>
                          <p>Network Growth %</p>
                        </div>
                      </div>
                      {/* End counter 4 */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End parallax */}
          {/* Start contain wrapp */}
          <div className="contain-wrapp padding-bot30">
            <div className="container">
              <div className="row">
                <div className="section-heading text-center">
                  <h5>Testimonials</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 owl-column-wrapp">
                  <div className="recent-3column owl-carousel owl-theme">
                    {/* Start item 1 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar01.jpg" alt /></a>
                          <h6>Edah <span>serbo</span></h6>
                          <p>Owner - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 1 */}
                    {/* Start item 2 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar02.jpg" alt /></a>
                          <h6>Asep <span>jebot</span></h6>
                          <p>CFO - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 2 */}
                    {/* Start item 3 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar03.jpg" alt /></a>
                          <h6>Ujang <span>bako</span></h6>
                          <p>CEO - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 3 */}
                    {/* Start item 4 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar04.jpg" alt /></a>
                          <h6>Neng <span>ebrod</span></h6>
                          <p>Manager - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 4 */}
                    {/* Start item 5 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar05.jpg" alt /></a>
                          <h6>Entis <span>kutik</span></h6>
                          <p>Designer - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 5 */}
                    {/* Start item 6 */}
                    <div className="item">
                      <div className="testimoni-wrapp">
                        <div className="testimoni">
                          <blockquote>
                            <p>
                              Cu nec salutandi voluptatibus. Ceteros definitionem ad ius, ut eam unum volutpat, omnium gloriatur te mei.
                            </p>
                          </blockquote>
                        </div>
                        <div className="testimoni-author">
                          <a href="#" className="avatar"><img src="img/testimoni/avatar06.jpg" alt /></a>
                          <h6>Dadang <span>bool</span></h6>
                          <p>Designer - <a href="#">99webpage.com</a></p>
                        </div>
                      </div>
                    </div>
                    {/* End item 6 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End contain wrapp */}
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