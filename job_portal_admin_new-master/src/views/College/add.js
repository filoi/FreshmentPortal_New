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
import States from '../../components/States';
import swal from 'sweetalert'
import AsyncSelect from 'react-select/lib/Async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Select from 'react-select';
import Cities from '../../components/Cities';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015

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
          college_code:'', 
          year:'', 
          website:'', 
          university_id:'', 
          address:'', 
          state:null, 
          city:null, 
          pin_code:'', 
          geolocation:'', 
          total_student:0, 
          palcement_head_name:'', 
          placement_head_email:'', 
          placement_head_contact_no:'', 
          university_affiliated_to:'',
          status:'active',
          inputValue:'',
          universityOption:[],
          selectedUniversityOption:null,
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.filterColors = this.filterColors.bind(this);
        this.onChangeSelectUniversityOption = this.onChangeSelectUniversityOption.bind(this);
        this.changeUniversity = this.changeUniversity.bind(this);
        this.onChangeSelectState = this.onChangeSelectState.bind(this);
        
      }

      componentDidMount = () => {
        this.changeUniversity('a');
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
        
      }


      onChangeSelectUniversityOption(selectedUniversityOption){
        this.setState({selectedUniversityOption});
       
      }

      onChangeSelectState(state){
        this.setState({state});
      }


      changeUniversity(inputValue){
        var that =this;
        if(inputValue === null || inputValue === "" || inputValue === undefined){
          that.setState({universityOption:[]});  
          //that.setState({ selectedCourseOption:null });
    
        }else{
        Request.RequestHandle( "university",'GET',null,function(result) {
          // Request.RequestHandle( "university?search="+inputValue,'GET',null,function(result) {
          if(result.status){
            that.setState({ selectedUniversityOption:null });
            that.setState({universityOption:[]});              
            var universityOption =[];
                result.data.results.map(item => { 
                  universityOption.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
                that.setState({universityOption});
          }
         
            }); 
        }
    }

      handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
      };

      promiseOptions = inputValue =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(this.filterColors(inputValue));
          }, 1000);
        });

      filterColors = (inputValue) => {
          if (inputValue) {
            var that = this;
            Request.RequestHandle('university?search='+inputValue,'GET',null,function(result) {
            that.setState({universityOption:[]});              
            var universityOption =[];
                result.data.results.map(item => { 
                  universityOption.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
                that.setState({universityOption});
            }); 
          }
          
          return this.state.universityOption;
        };  

      handleSubmit(event) {
        event.preventDefault();
         let university = ""
        if(this.state.selectedUniversityOption !== null){
          university = this.state.selectedUniversityOption.value
        }

        let selectState = "";
        let city = "";
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

        const universityData ={
          name:this.state.name,
          email:this.state.email, 
          contact_no:this.state.contact_no, 
          college_code:this.state.college_code, 
          year:this.state.year, 
          website:this.state.website, 
          university_id:university, 
          address:this.state.address, 
          state:selectState, 
          city:city, 
          pin_code:this.state.pin_code, 
          geolocation:this.state.geolocation, 
          total_student:this.state.total_student, 
          palcement_head_name:this.state.palcement_head_name, 
          placement_head_email:this.state.placement_head_email, 
          placement_head_contact_no:this.state.placement_head_contact_no, 
          university_affiliated_to:this.state.university_affiliated_to,
          status:this.state.status,
          }
        

        Request.RequestHandle('college','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
       
        if(Result.status){
            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/college");
        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
    // validation(){
    //     var x = true;
    //     if(this.state.name ==""){
    //         x= false;
    //     }
    //     if(this.state.email ==""){
    //         x= false;
    //     }
    //     if(this.state.contact_no ==""){
    //         x= false;
    //     }
    //     if(this.state.website ==""){
    //         x= false;
    //     }
    //     if(this.state.year ==""){
    //         x= false;
    //     }
    //     return x;
    // }

    resetForm(){
        this.setState({
            name : '',
            email:'',
            contact_no:'',
            website:'',
            description:'',
            status:'active',
            year:''
        })

    }

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add College
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>

                <Tabs>
                  <TabList>
                    <Tab>Basic Details</Tab>
                    <Tab disabled>Course & Specialization </Tab>
                  </TabList>

                  <TabPanel>
                  <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">College Name:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="College Name"  />
                      </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">University:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={this.state.selectedUniversityOption}
                        onChange={this.onChangeSelectUniversityOption}
                       // onInputChange ={this.changeUniversity}
                        options={this.state.universityOption}
                        placeholder={"Search and Select"}
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Email:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="E-Mail" autoComplete="email"/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Contact No:*</Label>
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
                        <Label htmlFor="email-input">College Code:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="college_code" name="college_code" value={this.state.college_code} onChange ={this.onChange} placeholder="Code"/>                        
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
                        <Label htmlFor="email-input">Pin Code:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="pin_code" name="pin_code" value={this.state.pin_code} onChange ={this.onChange} placeholder="Pin Code"/>                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Since:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="year" name="year" value={this.state.year} onChange ={this.onChange} placeholder="Year"/>
                       
                      </Col>
                    </FormGroup> 
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Website:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} placeholder="URL"/>
                       
                      </Col>
                    </FormGroup>  
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Name:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="palcement_head_name" name="palcement_head_name" value={this.state.palcement_head_name} onChange ={this.onChange}  placeholder="Placement Head Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Email:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="placement_head_email" name="placement_head_email" value={this.state.placement_head_email} onChange ={this.onChange}  placeholder="Placement Head Email"  />
                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Contact No:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="placement_head_contact_no" name="placement_head_contact_no" value={this.state.placement_head_contact_no} onChange ={this.onChange}  placeholder="Placement Head Contact Number"  />
                      </Col>
                    </FormGroup>
                   
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Student Range:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" id="total_student" name="total_student" value={this.state.total_student} onChange ={this.onChange} placeholder="Total Student" >
                        <option value="">Select</option>
                        <option value="0-500">0-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000-5000">1000-5000</option>
                        <option value="5000+">5000+</option>
                      </Input>  
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Geolocation:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="geolocation" name="geolocation" value={this.state.geolocation} onChange ={this.onChange} placeholder="Geolocation"/>                      
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
                  
                  </TabPanel>
                  <TabPanel>
                    <h2>Any content 2</h2>
                  </TabPanel>
                </Tabs>
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
