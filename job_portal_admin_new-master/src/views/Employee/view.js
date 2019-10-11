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
    InputGroup, InputGroupAddon,
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert'
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
          address:'',
          state:'',
          city:'',
          pin_code:'',
          hr_name:'',
          hr_email:'',
          hr_contact_no:'',
          status:'',
          description:'',
          industry:'',
          location:'',          
          fax:''          
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }


      componentDidMount = () => {
        Request.RequestHandle('employer/'+this.props.match.params.id,'GET',null,this.getData); 
      }

      getData(result){
        if(result.status){
          var data = result.data.results[0];
          this.setState({
            name : data.name,
            email:data.email,
            contact_no:data.contact_no,
            website:data.website,
            address:data.address,
            state:data.state,
            city:data.city,
            pin_code:data.pin_code,
            hr_name:data.hr_name,
            hr_email:data.hr_email,
            hr_contact_no:data.hr_contact_no,
            status:data.status,
            description:data.description,
            industry:data.industry,
            location:data.locations,
            fax:data.fax,
          });
        }
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            address:this.state.website,
            state:this.state.state,
            city:this.state.city,
            pin_code:this.state.pin_code,
            hr_name:this.state.hr_name,
            hr_email:this.state.hr_email,
            hr_contact_no:this.state.hr_contact_no,
            status:this.state.status,
            fax:this.state.fax,
          }
        
     
        Request.RequestHandle('employer','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
       
        if(Result.status){
          this.setState({
            name:'',
            email:'',
            contact_no:'',
            website:'',
            address:'',
            state:'',
            city:'',
            pin_code:'',
            hr_name:'',
            hr_email:'',
            hr_contact_no:'',
            status:'',      
            fax:'',      
          })

            swal("Success!", "Your information has been submitted.", "success");
        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
    resetForm(){
        this.setState({
          name:'',
          email:'',
          contact_no:'',
          website:'',
          address:'',
          state:'',
          city:'',
          pin_code:'',
          hr_name:'',
          hr_email:'',
          hr_contact_no:'',
          status:'',      
          fax:'',      
        })

    }

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add Employer
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                   <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Employer Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="University Name" disabled />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="E-Mail" autoComplete="email" disabled/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Contact No:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} placeholder="Phone Number" disabled/>
                      </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Fax:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="fax" name="fax" value={this.state.fax} onChange ={this.onChange} placeholder="Fax" disabled/>
                      </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Website:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} placeholder="URL" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Industry:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="industry" name="industry" value={this.state.industry} onChange ={this.onChange}  disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Nature of Business:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder="Nature of Business" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Address:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="address" name="address" value={this.state.address} onChange ={this.onChange} placeholder="Address" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">State:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="state" name="state" value={this.state.state} onChange ={this.onChange} placeholder="State" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">City:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="city" name="city" value={this.state.city} onChange ={this.onChange} placeholder="City" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Pin Code:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="pin_code" name="pin_code" value={this.state.pin_code} onChange ={this.onChange} placeholder="Pin Code" disabled/>
                      </Col>
                    </FormGroup>
                   
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="hr_name" name="hr_name" value={this.state.hr_name} onChange ={this.onChange} placeholder="Company Name" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="hr_email" name="hr_email" value={this.state.hr_email} onChange ={this.onChange} placeholder="Company Email" disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Phone Number:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="hr_contact_no" name="hr_contact_no" value={this.state.hr_contact_no} onChange ={this.onChange} placeholder="Phone Number" disabled/>
                      </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="status" name="status" value={this.state.status} onChange ={this.onChange} disabled/>
                     
                      </Col>
                    </FormGroup>  
                 
                </CardBody>
                <CardFooter>
                      <Button type="button" variant="contained"   onClick={()=>{history.goBack()}}  >Cancel</Button>
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
