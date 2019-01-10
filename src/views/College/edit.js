import React, { Component } from 'react'
import { Link } from "react-router-dom";
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
    FormText
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert'
import AsyncSelect from 'react-select/lib/Async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {Table} from 'antd';
import "antd/dist/antd.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [{
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
},{
  title: 'Course',
  dataIndex: 'course',
  key: 'course',
}, {
  title: 'Specialization',
  dataIndex: 'specialization',
  key: 'specialization',
}];


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
  
export default class edit extends Component {
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
          state:'', 
          city:'', 
          pin_code:'', 
          geolocation:'', 
          total_student:'', 
          palcement_head_name:'', 
          placement_head_email:'', 
          placement_head_contact_no:'', 
          status:'',
          inputValue:'',
          universityOption:[],     
          courseOption:[],
          course_id:'',
          course_name:'',
          selectCourses:[],
          specializationOption:[],
          specialization_id:'',
          specialization_name:'',
          selectSpecialization:[],
          printCourse:'',
          selectedCSOption:[],
          tabIndex: 0,
          footerButton:true
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.filterColors = this.filterColors.bind(this);
        this.filterCourse = this.filterCourse.bind(this);
        this.onChangeSelectOption = this.onChangeSelectOption.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.getData = this.getData.bind(this);
        this.getCourseData = this.getCourseData.bind(this);
        this.deleteSelectedCourse = this.deleteSelectedCourse.bind(this);
        this.selectCoursesSpecialization = this.selectCoursesSpecialization.bind(this);
        this.onChangeSpecializations = this.onChangeSpecializations.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.tagSelect = this.tagSelect.bind(this);
        
      }

      componentDidMount = () => {
        Request.RequestHandle('college/'+this.props.match.params.id,'GET',null,this.getData); 
        Request.RequestHandle('ccs/'+this.props.match.params.id+'/courses','GET',null,this.getCourseData); 
        var arry = [];
         arry.push({id: "5c3463a4d0e9d113d2013649", value: "Test2"})
        this.setState({selectCourses:arry})
      }
      getCourseData(result){
        var dataSt = result.data.results;
        if(result.status && dataSt.length !== 0){
        console.log(dataSt);

        var selectedCSOption =[];
        selectedCSOption = this.state.selectedCSOption;
       
        dataSt.map((item, i)=>{ 
          var course =''
          if (item.course_doc.length !== 0) {
           course = item.course_doc[0].name
            
          }
          var specialization =''
          if (item.specializations_doc.length !== 0) {
            specialization = item.specializations_doc[0].name
            
          }
          selectedCSOption.push({
            'key':i,
            'course_id':item.course_id,
            'course':specialization,
            'specialization_id':item.specialisation_id,
            'specialization':course,
            'action':<div><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(i,item.course_id,item.specialisation_id) }} ><DeleteIcon fontSize="small" /></IconButton></div>
  
          });

        })
       

        }
      }

      getData(result){
         var dataSt = result.data.results;
        if(result.status && dataSt.length !== 0){
          var data = dataSt[0];
          this.setState({
            name:data.name,
            email:data.email, 
            contact_no:data.contact_no, 
            college_code:data.college_code, 
            year:data.year, 
            website:data.website, 
            university_id:data.university_id, 
            address:data.address, 
            state:data.state, 
            city:data.city, 
            pin_code:data.pin_code, 
            geolocation:data.geolocation, 
            total_student:data.total_student, 
            palcement_head_name:data.palcement_head_name, 
            placement_head_email:data.placement_head_email, 
            placement_head_contact_no:data.placement_head_contact_no, 
            status:data.status,
          });
        }
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
        
      }

      onChangeSelectOption(selectedOption){
        this.setState({university_id:selectedOption.value});
       
      }

      onChangeCourse(selectedOption){
        this.setState({course_id:selectedOption.value,course_name:selectedOption.label});
      }

      onChangeSpecializations(selectedOption){
        this.setState({specialization_id:selectedOption.value,specialization_name:selectedOption.label});
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
              console.log('====================================');
              console.log(result);
              console.log('====================================');
              if(result.status){
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
          
          return this.state.universityOption;
        };  

        promiseOptionsCourse = inputValue =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(this.filterColors(inputValue));
          }, 1000);
        });

      filterCourse = (inputValue) => {
        
          if (inputValue) {
            var that = this;
            Request.RequestHandle('course?search='+inputValue,'GET',null,function(result) {
            that.setState({courseOption:[]});
            var courseOption =[];
                result.data.results.map(item => { 
                  courseOption.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
               
                that.setState({courseOption});
            }); 
          }
          console.log('====================================');
          console.log( this.state.courseOption);
          console.log('====================================');
          return this.state.courseOption;
        }; 

        promiseOptionSpecialization = inputValue =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(this.filterSpecialization(inputValue));
          }, 2000);
        });

      filterSpecialization = (inputValue) => {
        
          if (inputValue) {
            var that = this;
            Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
            that.setState({specializationOption:[]});
            var specializationOption =[];
                result.data.results.map(item => { 
                  specializationOption.push({
                    'label':item.name,
                    'value':item._id,
                    });
                });
               
                that.setState({specializationOption});
            }); 
          }
          console.log('====================================');
          console.log( this.state.specializationOption);
          console.log('====================================');
          return this.state.specializationOption;
        }; 

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
          name:this.state.name,
          email:this.state.email, 
          contact_no:this.state.contact_no, 
          college_code:this.state.college_code, 
          year:this.state.year, 
          website:this.state.website, 
          university_id:this.state.university_id, 
          address:this.state.address, 
          state:this.state.state, 
          city:this.state.city, 
          pin_code:this.state.pin_code, 
          geolocation:this.state.geolocation, 
          total_student:this.state.total_student, 
          palcement_head_name:this.state.palcement_head_name, 
          placement_head_email:this.state.placement_head_email, 
          placement_head_contact_no:this.state.placement_head_contact_no, 
          status:this.state.status,

          }
        
        console.log(universityData);
        Request.RequestHandle('college/'+this.props.match.params.id,'POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        console.log('====================================');
        console.log(Result);
        console.log('====================================');
        if(Result.status){
            swal("Succses!", "Your information has been submitted.", "success");
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
            status:'',
            year:''
        })

    }

    deleteSelectedCourse(id){
     var selectCourses = this.state.selectCourses;
      selectCourses.splice(id, 1);
      this.setState({selectCourses});
    }

    selectCoursesSpecialization(){
     
      if(this.state.specialization_id ==="" || this.state.course_id ===""){

      }else{
        var selectedCSOption =[];
        var that = this;
        var id = this.props.match.params.id;
        selectedCSOption = this.state.selectedCSOption;
        selectedCSOption.push({
          'key':this.state.course_id,
          'course_id':this.state.course_id,
          'course':this.state.course_name,
          'specialization_id':this.state.specialization_id,
          'specialization':this.state.specialization_name,
          'action':''

        });

        selectedCSOption.map((item, i)=>{ 
          selectedCSOption[i].key = i;
          selectedCSOption[i].action = <div><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(i,this.state.course_id,this.state.specialization_id) }} ><DeleteIcon fontSize="small" /></IconButton></div>;
        })
       
        var list = {list:[{'course_id':this.state.course_id,'specialisation_id':this.state.specialization_id,'college_id':id}]}
        Request.RequestHandle('ccs','POST',JSON.stringify(list),function(result){
          console.log('====================================');
          console.log(result);
          console.log('====================================');
          if (result.status) {
            that.setState(selectedCSOption);            
          }
        });
      }
    }

    deleteData(key,course,specialization){
      var id = this.props.match.params.id;
      var that = this;

      Request.RequestHandle('ccs/'+id+'/courses/'+course+'/'+specialization,'DELETE',null,function(result){
        if(result.status){
          let selectedCSOption = that.state.selectedCSOption
          selectedCSOption = selectedCSOption.splice(key, 1);
          that.setState({ selectedCSOption })
        }
      }); 
    }

    DeleteResponse(result){
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    }

    printSelectedCS(){
      return <Table dataSource={this.state.selectedCSOption} columns={columns} />
    }

    tagSelect(tagSelect){
      this.setState({tabIndex:tagSelect});
      if(tagSelect === 1){
        this.setState({footerButton:false});
      }else{
        this.setState({footerButton:true});
      }
    }

  render() {
    const {alerttext,footerButton} = this.state;
    let button;
    if (footerButton) {
      button =  <CardFooter>
                <Button type="reset" variant="contained" color="secondary" className="left-margin" onClick={()=>{this.resetForm()}}  >Reset</Button>
                <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  >Save</Button>
                <Button type="button" variant="contained"  className="left-margin rightbtn" onClick={()=>{history.goBack()}}  >Cancel</Button>
                </CardFooter>
    } else {
      button = '';
    }
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Edit College
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>

                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tagSelect(tabIndex)}>
                  <TabList>
                    <Tab>Basic Details</Tab>
                    <Tab>Course & Specialization </Tab>
                  </TabList>

                  <TabPanel>
                  <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">College Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="University Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">E-Mail:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} placeholder="E-Mail" autoComplete="email"/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Code:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="college_code" name="college_code" value={this.state.college_code} onChange ={this.onChange} placeholder="Code"/>                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Pin Code:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="pin_code" name="pin_code" value={this.state.pin_code} onChange ={this.onChange} placeholder="Pin Code"/>                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Phone Number:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} placeholder="Phone Number" autoComplete="email"/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="palcement_head_name" name="palcement_head_name" value={this.state.palcement_head_name} onChange ={this.onChange}  placeholder="Placement Head Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Email:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="placement_head_email" name="placement_head_email" value={this.state.placement_head_email} onChange ={this.onChange}  placeholder="Placement Head Email"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Placement Head Contact Number:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="placement_head_contact_no" name="placement_head_contact_no" value={this.state.placement_head_contact_no} onChange ={this.onChange}  placeholder="Placement Head Contact Number"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Web Site:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} placeholder="URL"/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Address:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="address" name="address" value={this.state.address} onChange ={this.onChange} placeholder="Address"/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Total Student:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="total_student" name="total_student" value={this.state.total_student} onChange ={this.onChange} placeholder="Total Student"/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Geolocation:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="geolocation" name="geolocation" value={this.state.geolocation} onChange ={this.onChange} placeholder="Geolocation"/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">University:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <AsyncSelect cacheOptions defaultOptions value={this.university_id} onChange={this.onChangeSelectOption} loadOptions={this.promiseOptions} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">State:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="state" name="state" value={this.state.state} onChange ={this.onChange} placeholder="State"/>                      
                      </Col>
                     
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">City:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="city" name="city" value={this.state.city} onChange ={this.onChange} placeholder="City"/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="status" name="status" value={this.state.status} onChange ={this.onChange} placeholder="Status"/>               
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Year:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="number" id="year" name="year" value={this.state.year} onChange ={this.onChange} placeholder="Year"/>
                       
                      </Col>
                    </FormGroup>   
                  </TabPanel>
                  <TabPanel>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Course:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <AsyncSelect cacheOptions defaultOptions value={this.course_id} onChange={this.onChangeCourse} loadOptions={this.promiseOptionsCourse} />
                      </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specialization:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <AsyncSelect cacheOptions defaultOptions value={this.specialization_id} onChange={this.onChangeSpecializations} loadOptions={this.promiseOptionSpecialization} />
                      </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col xs="12" md="12">
                      <Button type="button" variant="contained" color="primary" className="left-margin rightbtn"  onClick={()=>{this.selectCoursesSpecialization()}} >Select</Button>                      
                      </Col>
                      </FormGroup>
                      {this.printSelectedCS()}
                  </TabPanel>
                </Tabs>
                </CardBody>
                {button}
               
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
