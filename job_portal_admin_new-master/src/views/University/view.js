import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Col, 
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
    FormFeedback,
    InputGroup, InputGroupAddon, InputGroupText,
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
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
          name:'',
          email:'',
          contact_no:'',
          website:'',
          description:'',      
          status:'',      
          year:'',      
          address:'',
          tabIndex: 0,
          contact_person_name:'',
          contact_person_designation:'',
          contact_person_department:'',
          contact_person_email:'',
          contact_person_mobile:'',
          number_of_college:''  
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        this.tagSelect = this.tagSelect.bind(this);

        //this.onDismiss = this.onDismiss.bind(this);
      }

      tagSelect(tagSelect){
        this.setState({tabIndex:tagSelect});
      }


      componentDidMount = () => {
        Request.RequestHandle('university/'+this.props.match.params.id,'GET',null,this.getData); 
      }

      getData(result){
        if(result.status){
          console.log('====================================');
          console.log(result);
          console.log('====================================');
          var data = result.data.results[0];
          this.setState({
          name : data.name,
          email:data.email,
          contact_no:data.contact_no,
          website:data.website,
          description:data.description,
          status:data.status,
          year:data.year,
          address:data.address,
          contact_person_name:data.contact_person_name,
          contact_person_designation:data.contact_person_designation,
          contact_person_department:data.contact_person_department,
          contact_person_email:data.contact_person_email,
          contact_person_mobile:data.contact_person_mobile,
          number_of_college:data.college_doc.length
          });
        }
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            description:this.state.description,
            status:this.state.status,
            year:this.state.year,
            address:this.state.address
          }
        
        Request.RequestHandle('university/'+this.props.match.params.id,'POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        if(Result.status){
            swal("Success!", "Your information has been submitted.", "success");
        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
    
    resetForm(){
        this.setState({
            name : '',
            email:'',
            contact_no:'',
            website:'',
            description:'',
            status:'',
            year:'',
            address:''
        })

    }

    

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  View University
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                   <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>

                  <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tagSelect(tabIndex)}>
                  <TabList>
                    <Tab>University Details</Tab>
                    <Tab>Contact Person's Details</Tab>
                  </TabList>
                  <TabPanel>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">University Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="University Name" disabled />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Address:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="address" name="address" value={this.state.address} onChange ={this.onChange} placeholder="Address" disabled />
                       
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="Email" autoComplete="email" disabled />
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Contact Number:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} placeholder="Phone Number" autoComplete="email" disabled />
                      </InputGroup>
                      </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Since:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="year" name="year" value={this.state.year} onChange ={this.onChange} placeholder="Year" disabled/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Website:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} placeholder="URL" disabled />
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">No of affiliated colleges:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="number_of_college" name="number_of_college" value={this.state.number_of_college} onChange ={this.onChange} placeholder="" disabled />
                      </Col>
                    </FormGroup> 
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="status" name="status" value={this.state.status} onChange ={this.onChange} placeholder="Status" disabled />               
                      </Col>
                    </FormGroup>    
                    </TabPanel>
                  <TabPanel>

                  <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="contact_person_name" name="contact_person_name" value={this.state.contact_person_name} onChange ={this.onChange} placeholder="Name" disabled />                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Designation:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="contact_person_designation" name="contact_person_designation" value={this.state.contact_person_designation} onChange ={this.onChange} placeholder="Designation" disabled />                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Department:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="contact_person_department" name="contact_person_department" value={this.state.contact_person_department} onChange ={this.onChange} placeholder="Department" disabled/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="contact_person_email" name="contact_person_email" value={this.state.contact_person_email} onChange ={this.onChange} placeholder="Email"disabled />                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Mobile:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="contact_person_mobile" name="contact_person_mobile" value={this.state.contact_person_mobile} onChange ={this.onChange} placeholder="Mobile" disabled />                      
                      </Col>
                    </FormGroup>

                  </TabPanel>
                  </Tabs>

                </CardBody>
                <CardFooter>
                      <Button type="button" variant="contained"  className="left-margin" onClick={()=>{history.goBack()}}  >Cancel</Button>
  
                </CardFooter>
                </Form>
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}
