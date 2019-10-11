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
import Select from 'react-select';
import States from '../../components/States';
import Cities from '../../components/Cities';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

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
          state:null,
          city:null,
          pin_code:'',
          hr_name:'',
          hr_email:'',
          hr_contact_no:'',
          status:'active', 
          description:'',
          industry:{},
          location:'',
          industryData:[],
          fax:''     
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        this.onChangeSelectState = this.onChangeSelectState.bind(this);
        this.onChangeSelectIndustry = this.onChangeSelectIndustry.bind(this);

      }

      componentDidMount = () => {
        this.fetch();
      }

      fetch = (params = {}) => {
        this.setState({ loading: true });
        if(params.page === undefined){
          params.page = 1;
        }
         
        Request.RequestHandle('employer/get/industry','GET',null,this.getData); 
      };

      getData(Result){
       
        let industryData =[];
          if(Result.status){
            Result.data.results.map(item =>{
              industryData.push({label:item,value:item})
            })
            this.setState({industryData:industryData});
          }
      }

      onChangeSelectState(state){
        this.setState({state});
      }

      onChangeSelectIndustry(industry){
        this.setState({industry});
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      onChangeAuto(e){
        
        this.setState({'city':e});
      }

      handleSubmit(event) {
        event.preventDefault();

        let selectState = ""
        let city = ""
        if(this.state.state !== null){
          selectState = this.state.state.value
        }

        if(this.state.city !=="" && this.state.city !==null && this.state.city[0] !== undefined){
          if(this.state.city[0].label !== undefined){
            city = this.state.city[0].label;
          }else{
            city = this.state.city[0];
          }
        }
        console.log('====================================');
        console.log(city,this.state.city);
        console.log('====================================');
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            address:this.state.address,
            state:selectState,
            city:city,
            pin_code:this.state.pin_code,
            hr_name:this.state.hr_name,
            hr_email:this.state.hr_email,
            hr_contact_no:this.state.hr_contact_no,
            status:this.state.status,
            description:this.state.description,
            industry:this.state.industry.value,
            locations:this.state.location,
            fax:this.state.fax,
          }

      
     
        Request.RequestHandle('employer','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        console.log('====================================');
        console.log(Result);
        console.log('====================================');
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
            description:'',
            industry:'',
            location:'',
            fax:'',    
            status:'active',      
          })

            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/employee");

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
          description:'',
          status:'active',  
          industry:'',
          location:'',    
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
                        <Label htmlFor="text-input">Employer Name:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder=" Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Email:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="E-Mail" autoComplete="email"/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Contact No:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} placeholder="Phone Number" />
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
                        <Input type="text" id="fax" name="fax" value={this.state.fax} onChange ={this.onChange} placeholder="Fax"/>
                      </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer Web Site:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} placeholder="URL"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Industry:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.industry}
                        onChange={this.onChangeSelectIndustry}
                        options={this.state.industryData}
                        placeholder={"Select"}
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Nature of Business:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder="Nature of Business"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Address:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="address" name="address" value={this.state.address} onChange ={this.onChange} placeholder="Address"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">State:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.state}
                        onChange={this.onChangeSelectState}
                        options={States}
                        placeholder={"Select"}
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">City:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Typeahead
                        allowNew
                        onChange={(city) => {
                         
                          this.setState({city});

                          console.log(city[0]);
                        }}
                        options={Cities}
                        // emptyLabel ={undefined}
                        id="city" 
                        name="city" 
                        selected={this.state.city}
                        placeholder="City"
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Pin Code:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="number" id="pin_code" name="pin_code" value={this.state.pin_code} onChange ={this.onChange} placeholder="Pin Code"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Name:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="hr_name" name="hr_name" value={this.state.hr_name} onChange ={this.onChange} placeholder="Company Name"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Email:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="hr_email" name="hr_email" value={this.state.hr_email} onChange ={this.onChange} placeholder="Company Email"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">SPOC Phone Number:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="hr_contact_no" name="hr_contact_no" value={this.state.hr_contact_no} onChange ={this.onChange} placeholder="Phone Number" />
                      </InputGroup>
                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="select" id="status" name="status" value={this.state.status} onChange ={this.onChange} >
                      <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Input>
                      </Col>
                    </FormGroup>   
                   
                </CardBody>
                <CardFooter>
                      <Button type="reset" variant="contained" color="secondary" className="left-margin" onClick={()=>{this.resetForm()}}  >Reset</Button>
                      <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  >Save</Button>
                      <Button type="button" variant="contained"  className="left-margin rightbtn" onClick={()=>{history.goBack()}}  >Cancel</Button>
  
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
