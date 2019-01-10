import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
 import AuthService from '../../../components/AuthService';
 import ReCAPTCHA from "react-google-recaptcha";
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
            restext:'Sign In to your account'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ReCAPTCHAGGet = this.ReCAPTCHAGGet.bind(this);

    }

    componentWillMount(){
      if(Auth.loggedIn())
          this.props.history.replace('/');
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

  render() {
    const { username, password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
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
        </Container>
      </div>
    );
  }
}

export default Login;
