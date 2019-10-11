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
    InputGroup, 
    InputGroupAddon, 
    InputGroupText,
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert';
import Select from 'react-select';
import BaseApi from '../../components/BaseApi';

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
          job_title:'',
          number:'',
          description:'',
          closing_date:'', 
          specialization:'',     
          status:'active', 
          universityOption:[],
          selectedOption: null,
          selectedArry:[],
          spOptions:[],
          selectedCourseOption: [],
          courseOptions:[],
          desired_educational_qualification:'',     
          job_location:'',   
          job_start_date:'',     
          desired_skills:'',     
          minimum_marks_required:'', 
          minimum_percentage:'',
          minimum_cgpa:'',
          minimum_grade:'' ,
          max_ctc:'',
          min_ctc:''   
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeSpecializations = this.changeSpecializations.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.changeCourse = this.changeCourse.bind(this);

      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        var selectOptions = [];
        selectedOption.map(item => { 
          selectOptions.push(item.value)
        })
        this.setState({ selectedArry:selectOptions });
      }

      changeSpecializations(inputValue){
        var that =this;
        Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
          that.setState({universityOption:[]});              
          var spOptions =[];
              result.data.results.map(item => { 
                spOptions.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({spOptions});
          }); 
      }

      handleChangeCourse = (selectedCourseOption) => {
        this.setState({ selectedCourseOption });
      }

      changeCourse(inputValue){
        var that =this;
        Request.RequestHandle('Course?search='+inputValue,'GET',null,function(result) {
          var courseOptions =[];
              result.data.results.map(item => { 
                courseOptions.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({courseOptions});
          }); 
      }

      handleSubmit(event) {
        event.preventDefault();
       
        let course =[];
        this.state.selectedCourseOption.map((value,index)=>{
          course.push(value.value);
        })
       
        const universityData ={
          job_title : this.state.job_title,
          number:this.state.number,
          description:this.state.description,
          closing_date:this.state.closing_date,
          status:this.state.status,
          list:this.state.selectedArry,
          courseList:course,
         // desired_educational_qualification:this.state.selectedCourseOption,    
          job_location:this.state.job_location,    
          job_start_date:this.state.job_start_date,    
          desired_skills:this.state.desired_skills,    
          minimum_marks_required:this.state.minimum_marks_required,        
          minimum_percentage:this.state.minimum_percentage,
          minimum_cgpa:this.state.minimum_cgpa,
          minimum_grade:this.state.minimum_grade,   
          min_ctc:this.state.min_ctc,  
          max_ctc:this.state.max_ctc   
        }
        
        Request.RequestHandle('vacancy','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        if(Result.status){
          this.resetForm();
            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/vacancy");

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
          job_title:'',
          number:'',
          description:'',
          closing_date:'',      
          status:'active',
          desired_educational_qualification:'',     
          job_location:'',   
          job_start_date:'',     
          desired_skills:'',     
          minimum_marks_required:'',     
        })

    }

  render() {
    const {alerttext} = this.state;
    const { selectedOption,selectedCourseOption } = this.state;

    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add Vacancy
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
                        <Label htmlFor="text-input">Job Title:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="job_title" name="job_title" value={this.state.job_title} onChange ={this.onChange}  placeholder=""  />
                        <FormFeedback>Sorry. This name is already taken.</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">No. of Position:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="number" name="number" value={this.state.number} onChange ={this.onChange} placeholder=""/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Desired Education Qualification(s):</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Select
                        value={selectedCourseOption}
                        onChange={this.handleChangeCourse}
                        onInputChange ={this.changeCourse}
                        options={this.state.courseOptions}
                        isMulti
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specializations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        onInputChange ={this.changeSpecializations}
                        options={this.state.spOptions}
                        isMulti
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Min CTC:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="min_ctc" name="min_ctc" value={this.state.min_ctc} onChange ={this.onChange} placeholder=""/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Max CTC:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="text" id="max_ctc" name="max_ctc" value={this.state.max_ctc} onChange ={this.onChange} placeholder=""/>                      
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Start Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="date" id="job_start_date" name="job_start_date" value={this.state.job_start_date} onChange ={this.onChange} placeholder=""/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Closing Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="date" id="closing_date" name="closing_date" value={this.state.closing_date} onChange ={this.onChange} placeholder=""/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Locations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="job_location" name="job_location" value={this.state.job_location} onChange ={this.onChange} placeholder=""/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Minimum Marks:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">Percentage</InputGroupAddon>
                          <Input  name="minimum_percentage" value={this.state.minimum_percentage} onChange ={this.onChange}/>
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">CGPA</InputGroupAddon>
                          <Input  name="minimum_cgpa" value={this.state.minimum_cgpa} onChange ={this.onChange}/>
                        </InputGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">Grade</InputGroupAddon>
                          <Input type="select" 
                                name="minimum_grade" 
                                id="minimum_grade" 
                                placeholder="Minimum Grade"
                                value = {this.state.minimum_grade}
                                onChange={this.onChange}
                          >
                              <option></option>
                          {BaseApi.grades.map((material,index) => {
                            return <option value={material}>{material}</option>
                            })}
                          </Input>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Job Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder=""/>
                       
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
