import React, { Component, Suspense } from 'react';
import { Alert,Button,Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Select2 from 'react-select2-wrapper';
//import 'react-select2-wrapper/css/select2.css';
import Select from 'react-select';
import swal from 'sweetalert';
import {
  AppFooter,
  AppHeader
} from '@coreui/react';

const DefaultHeader = React.lazy(() => import('../../../containers/DefaultLayout/DefaultHeader'));
const DefaultFooter = React.lazy(() => import('../../../containers/DefaultLayout/DefaultFooter'));

class Register extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  constructor(props) {
    super(props);
    this.state = {
      college_details: null,
      course_details:null,
      college:[],
      course:[], 
      visible: false,
      alerttext:'',

    };
    this.onChange = this.onChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleChange = (college_details) => {
    this.setState({ college_details });
    console.log(`Option selected:`, college_details.value);

    if(college_details.value==="other")
    {
      console.log("mano")
    }
  }

  handleChange1 = (course_details) => {
    this.setState({ course_details });
    console.log(`Option selected:`, course_details);

    if(course_details.value==="other")
    {
      console.log("mano")
    }
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

  handleSubmit(event) {
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

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render() {

    const { college_details,course_details,college,course,alerttext  } = this.state;

    return (
<div className="app">
      <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>

      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <h1>Student Enrollment</h1>
                    <p className="text-muted"></p>
                    
                    <Alert className="alert alert-danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {alerttext}
                    </Alert>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        First Name
                      </InputGroupAddon>
                      <Input type="text" name="fname" placeholder="First Name" autoComplete="email" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Last Name
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="lname" placeholder="Last Name" autoComplete="new-password" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Email
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" placeholder="Email" autoComplete="new-password" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Contact
                        </InputGroupText>
                      </InputGroupAddon>

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{width:"50px",backgroundColor:"white"}}>
                          +91
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="contact_no" placeholder="Contact Number" autoComplete="new-password" onChange ={this.onChange} />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          College
                        </InputGroupText>
                      </InputGroupAddon>
                        <div style={{width:"50%"}}>
                            <Select
                              value={college_details}
                              onChange={this.handleChange}
                              options={college}
                            />
                        </div>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          Course
                        </InputGroupText>
                      </InputGroupAddon>
                        <div style={{width:"50%"}}>
                            <Select
                              value={course_details}
                              onChange={this.handleChange1}
                              options={course}
                            />
                        </div>
                    </InputGroup>

                    <Button color="success" block>Enroll</Button>
                    <a className="mt-1 form-control btn btn-info" href="http://localhost/Filoi%20Job%20Portal/Job%20Portal/">Home</a>
                    <a className="mt-1 form-control btn btn-default" href="http://localhost:3000/#/login">I already have an account</a>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>

      </div>
    );
  }
}

export default Register;
