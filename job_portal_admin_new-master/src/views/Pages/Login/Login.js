import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import AuthService from '../../../components/AuthService';
import BaseApi from '../../../components/BaseApi';
import createHistory from 'history/createBrowserHistory'
import ReCAPTCHA from "react-google-recaptcha";
 
const history = createHistory()
 const recaptchaRef = React.createRef();

  const Auth = new AuthService();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
            captch:false,
            restext:'Sign In to your account',
            isLogin:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);

    }

    componentWillMount(){
      if (this.props.location && this.props.location.search !==null ) {
       var searchParam = this.props.location.search;
        var splitText = searchParam.split('=');
        if(splitText[0] === '?key' && splitText[1] !== undefined && splitText[1] !== null && splitText[1] !== ''){
       
          Auth.setToken(splitText[1]); 
        
        //  return false;

          if(Auth.getProfile().role_name === "Admin"){
            this.props.history.replace('/dashboard');
  
          }else if(Auth.getProfile().role_name === "Student"){
            if(Auth.getProfile().default_password === true){
              this.props.history.replace({
                        pathname: '/Profile',
                        search: '',
                        state: { password: true }
                      })
            }else{
              this.props.history.replace('/Profile');
            }
          }else if(Auth.getProfile().role_name === "Employer"){
            if(Auth.getProfile().default_password === true){
              this.props.history.replace({
                        pathname: '/profile',
                        search: '',
                        state: { password: true }
                      })
            }else{
              this.props.history.replace('/dashboard');
            }
          }else{
            window.location.assign(BaseApi.home_url);
          }       
        }
      }
      
      if(Auth.loggedIn()){
        if(Auth.getProfile().role_name === "Admin"){
          this.props.history.replace('/dashboard');

        }else if(Auth.getProfile().role_name === "Student"){
          this.props.history.replace('/profile');
        }else if(Auth.getProfile().role_name === "Employer"){
          this.props.history.replace('/dashboard');
        }else{
          window.location.assign(BaseApi.home_url);
        }
      }else{
        window.location.assign(BaseApi.home_url);
      }
    }

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
    
      this.setState({captch:true});
    }

  render() {
    const { username, password ,isLogin } = this.state;
    if(isLogin){
      return(
      <div className="app flex-row align-items-center">
       {/* <Container>
          <Row className="justify-content-center">
          <Col md="8">
          <CardGroup>
                <Card className="p-4">
                  <CardBody>
          <h3>You are successfully logged in</h3>
        <p className="text-muted">Please wait, Redirecting......</p>
        </CardBody>
                </Card>
              </CardGroup>
        </Col>
        </Row>
        </Container> */}
      </div>
      )
    }else{
    return (
      <div className="app flex-row align-items-center">
        {/* <Container>
          <Row className="justify-content-center">
            <Col md="8">
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
                        sitekey={BaseApi.captcha_key}
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
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
  }
}

export default Login;
